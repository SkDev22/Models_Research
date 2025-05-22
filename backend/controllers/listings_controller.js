const Boarding = require("../models/listing_model.js");
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const { PythonShell } = require('python-shell');

// Helper function to clean up temporary files
const cleanupTempFiles = (files) => {
  files.forEach(file => {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
    }
  });
};

// Object detection function
const detectObjects = async (imagePath) => {
  try {
    const options = {
      mode: 'text',
      pythonPath: 'python',
      pythonOptions: ['-u'],
      scriptPath: path.join(__dirname, '../models'),
      args: [imagePath]
    };

    const results = await PythonShell.run('object_detection.py', options);
    
    // Try to find valid JSON in the output
    let jsonResponse;
    for (const line of results) {
      try {
        jsonResponse = JSON.parse(line);
        break;
      } catch (e) {
        continue;
      }
    }
    
    if (!jsonResponse) {
      throw new Error('No valid JSON response from object detection');
    }
    
    return jsonResponse.success ? jsonResponse.class : null;
  } catch (error) {
    console.error('Error in object detection:', error);
    return null;
  }
};

//@desc - Get all listings
//@Route - GET /listings/
const getAllListings = (req, res) => {
  Boarding.find()
    .then((listings) => res.status(200).json(listings))
    .catch((err) => {
      console.error("Error fetching listings:", err);
      res.status(400).json({ message: "Error fetching listings" });
    });
};

//@desc - Add new listing with 360 panorama generation and object detection
//@Route - POST /listings/add
const addListing = async (req, res) => {
  const tempDir = path.join(__dirname, '../temp');
  
  try {
    // 1. Process view images
    const viewImages = {};
    const viewFields = ['front', 'back', 'right', 'left', 'up', 'down'];
    const tempFiles = [];
    const detectedObjects = new Set(); // Using Set to store unique objects
    
    // Create temp directory if not exists
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }

    // Save each view image and prepare for processing
    for (const view of viewFields) {
      const fileKey = `viewImages[${view}]`;
      if (req.files[fileKey] && req.files[fileKey][0]) {
        const file = req.files[fileKey][0];
        viewImages[view] = file.filename;
        
        // Run object detection
        const detectedClass = await detectObjects(file.path);
        if (detectedClass) {
          detectedObjects.add(detectedClass);
        }
        
        // Save to temp directory for panorama generation
        const tempPath = path.join(tempDir, `${view}.jpg`);
        fs.copyFileSync(file.path, tempPath);
        tempFiles.push(tempPath);
      }
    }

    // 2. Generate 360 panorama if all images are present
    let panoramaFilename = null;
    if (tempFiles.length === 6) {
      const pythonScriptPath = path.join(__dirname, 'main.py');
      const panoramaOutputPath = path.join(tempDir, 'panorama.jpg');

      // Execute Python script
      await new Promise((resolve, reject) => {
        exec(`python ${pythonScriptPath} ${tempDir}`, (error, stdout, stderr) => {
          if (error) {
            console.error(`Python script error: ${error}`);
            console.error(`stderr: ${stderr}`);
            return reject(error);
          }

          if (fs.existsSync(panoramaOutputPath)) {
            panoramaFilename = `panorama-${Date.now()}.jpg`;
            const finalPanoramaPath = path.join(__dirname, '../uploads', panoramaFilename);
            fs.copyFileSync(panoramaOutputPath, finalPanoramaPath);
            tempFiles.push(panoramaOutputPath);
          }
          resolve();
        });
      });
    }

    // 3. Create and save the boarding document
    const boarding = new Boarding({
      title: req.body.title,
      Description: req.body.Description,
      location: req.body.location,
      price: Number(req.body.price),
      phoneNumber: req.body.phoneNumber,
      amenities: Array.isArray(req.body.amenities)
        ? req.body.amenities
        : [req.body.amenities],
      roomType: req.body.roomType,
      viewImages: viewImages,
      panoramaImage: panoramaFilename,
      detectedObjects: Array.from(detectedObjects) // Convert Set to Array
    });

    await boarding.save();

    // 4. Cleanup temporary files
    cleanupTempFiles(tempFiles);

    res.json({ 
      success: true, 
      message: "Listing created successfully",
      data: {
        id: boarding._id,
        panoramaImage: panoramaFilename,
        detectedObjects: Array.from(detectedObjects)
      }
    });

  } catch (error) {
    console.error("Error in addListing:", error);
    
    // Cleanup any remaining files on error
    const tempFiles = fs.readdirSync(tempDir)
      .filter(file => file.endsWith('.jpg'))
      .map(file => path.join(tempDir, file));
    cleanupTempFiles(tempFiles);

    res.status(500).json({ 
      success: false, 
      message: "Error creating listing",
      error: error.message 
    });
  }
};

//@desc - Generate standalone 360 panorama
//@Route - POST /listings/generate360
const generate360Image = async (req, res) => {
  const tempDir = path.join(__dirname, '../temp');
  
  try {
    // 1. Process uploaded images
    const viewFields = ['front', 'back', 'right', 'left', 'up', 'down'];
    const tempFiles = [];
    
    // Create temp directory if not exists
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }

    // Save each view image to temp directory
    for (const view of viewFields) {
      const fileKey = `viewImages[${view}]`;
      if (req.files[fileKey] && req.files[fileKey][0]) {
        const tempPath = path.join(tempDir, `${view}.jpg`);
        fs.copyFileSync(req.files[fileKey][0].path, tempPath);
        tempFiles.push(tempPath);
      }
    }

    if (tempFiles.length !== 6) {
      cleanupTempFiles(tempFiles);
      return res.status(400).json({ 
        success: false, 
        message: "All 6 view images are required" 
      });
    }

    // 2. Generate panorama
    const pythonScriptPath = path.join(__dirname, 'main.py');
    const outputPath = path.join(tempDir, 'panorama.jpg');

    await new Promise((resolve, reject) => {
      exec(`python ${pythonScriptPath} ${tempDir}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Python script error: ${error}`);
          console.error(`stderr: ${stderr}`);
          return reject(error);
        }
        resolve();
      });
    });

    // 3. Send the generated image
    if (fs.existsSync(outputPath)) {
      res.sendFile(outputPath, () => {
        // Cleanup after sending
        cleanupTempFiles([...tempFiles, outputPath]);
      });
    } else {
      throw new Error("Panorama generation failed");
    }

  } catch (error) {
    console.error("Error in generate360Image:", error);
    
    // Cleanup any remaining files
    const tempFiles = fs.readdirSync(tempDir)
      .filter(file => file.endsWith('.jpg'))
      .map(file => path.join(tempDir, file));
    cleanupTempFiles(tempFiles);

    res.status(500).json({ 
      success: false, 
      message: "Error generating 360 image",
      error: error.message 
    });
  }
};

//@desc - Get single listing
//@Route - GET /listings/:id
const getSingleListing = (req, res) => {
  Boarding.findById(req.params.id)
    .then((listing) => {
      if (!listing) {
        return res.status(404).json({ message: "Listing not found" });
      }
      res.status(200).json(listing);
    })
    .catch((err) => {
      console.error("Error fetching listing:", err);
      res.status(400).json({ message: "Error fetching listing" });
    });
};

//@desc - Update listing
//@Route - PUT /listings/update/:id
const updateListing = async (req, res) => {
  const tempDir = path.join(__dirname, '../temp');
  
  try {
    let listing = await Boarding.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // Check if any images are being updated
    const hasNewImages = req.files && Object.keys(req.files).length > 0;
    let detectedObjects = listing.detectedObjects || [];
    let panoramaFilename = listing.panoramaImage;

    // If new images are uploaded, process them
    if (hasNewImages) {
      const tempFiles = [];
      const newDetectedObjects = new Set(detectedObjects);
      const viewImages = { ...listing.viewImages };

      // Create temp directory if not exists
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
      }

      // Process each uploaded view image
      for (const [key, fileArray] of Object.entries(req.files)) {
        if (!fileArray || fileArray.length === 0) continue;
        
        const file = fileArray[0];
        const viewMatch = key.match(/viewImages\[(\w+)\]/);
        if (!viewMatch) continue;
        
        const view = viewMatch[1];
        viewImages[view] = file.filename;
        
        // Run object detection on new images
        const detectedClass = await detectObjects(file.path);
        if (detectedClass) {
          newDetectedObjects.add(detectedClass);
        }
        
        // Save to temp directory for possible panorama regeneration
        const tempPath = path.join(tempDir, `${view}.jpg`);
        fs.copyFileSync(file.path, tempPath);
        tempFiles.push(tempPath);
      }

      // Regenerate panorama if all 6 views are present (either existing or new)
      const allViewsPresent = ['front', 'back', 'right', 'left', 'up', 'down'].every(
        view => viewImages[view]
      );

      if (allViewsPresent) {
        // Copy any existing images that weren't updated to temp dir
        for (const [view, filename] of Object.entries(viewImages)) {
          if (!req.files[`viewImages[${view}]`] && filename) {
            const sourcePath = path.join(__dirname, '../uploads', filename);
            const tempPath = path.join(tempDir, `${view}.jpg`);
            fs.copyFileSync(sourcePath, tempPath);
            tempFiles.push(tempPath);
          }
        }

        const pythonScriptPath = path.join(__dirname, 'main.py');
        const panoramaOutputPath = path.join(tempDir, 'panorama.jpg');

        // Execute Python script to regenerate panorama
        await new Promise((resolve, reject) => {
          exec(`python ${pythonScriptPath} ${tempDir}`, (error, stdout, stderr) => {
            if (error) {
              console.error(`Python script error: ${error}`);
              console.error(`stderr: ${stderr}`);
              return reject(error);
            }

            if (fs.existsSync(panoramaOutputPath)) {
              panoramaFilename = `panorama-${Date.now()}.jpg`;
              const finalPanoramaPath = path.join(__dirname, '../uploads', panoramaFilename);
              fs.copyFileSync(panoramaOutputPath, finalPanoramaPath);
              tempFiles.push(panoramaOutputPath);
              
              // Delete old panorama if it exists
              if (listing.panoramaImage) {
                const oldPanoramaPath = path.join(__dirname, '../uploads', listing.panoramaImage);
                if (fs.existsSync(oldPanoramaPath)) {
                  fs.unlinkSync(oldPanoramaPath);
                }
              }
            }
            resolve();
          });
        });
      }

      // Update viewImages and detectedObjects
      listing.viewImages = viewImages;
      detectedObjects = Array.from(newDetectedObjects);
      
      // Cleanup temporary files
      cleanupTempFiles(tempFiles);
    }

    // Update other fields
    listing.title = req.body.title || listing.title;
    listing.Description = req.body.Description || listing.Description;
    listing.location = req.body.location || listing.location;
    listing.price = req.body.price ? Number(req.body.price) : listing.price;
    listing.phoneNumber = req.body.phoneNumber || listing.phoneNumber;
    listing.amenities = req.body.amenities 
      ? (Array.isArray(req.body.amenities) ? req.body.amenities : [req.body.amenities])
      : listing.amenities;
    listing.roomType = req.body.roomType || listing.roomType;
    listing.panoramaImage = panoramaFilename;
    listing.detectedObjects = detectedObjects;

    await listing.save();

    res.json({ 
      success: true, 
      message: "Listing updated successfully",
      data: listing
    });

  } catch (error) {
    console.error("Error updating listing:", error);
    
    // Cleanup any remaining files on error
    const tempFiles = fs.readdirSync(tempDir)
      .filter(file => file.endsWith('.jpg'))
      .map(file => path.join(tempDir, file));
    cleanupTempFiles(tempFiles);

    res.status(500).json({ 
      success: false, 
      message: "Error updating listing",
      error: error.message 
    });
  }
};

//@desc - Delete listing
//@Route - DELETE /listings/:id
const deleteListing = (req, res) => {
  Boarding.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json({ message: "Listing deleted" }))
    .catch((err) => {
      console.error("Error deleting listing:", err);
      res.status(400).json({ message: "Error deleting listing" });
    });
};

module.exports = {
  getAllListings,
  addListing,
  getSingleListing,
  updateListing,
  deleteListing,
  generate360Image
};