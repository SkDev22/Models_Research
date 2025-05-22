const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  getAllListings,
  addListing,
  getSingleListing,
  updateListing,
  deleteListing,
  generate360Image
} = require("../controllers/listings_controller.js");

const router = express.Router();

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads')); // Ensure absolute path
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// File filter to only accept images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Configure multer for file uploads
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 10 // Limit file size to 10MB
  }
}).fields([
  { name: 'viewImages[front]', maxCount: 1 },
  { name: 'viewImages[back]', maxCount: 1 },
  { name: 'viewImages[right]', maxCount: 1 },
  { name: 'viewImages[left]', maxCount: 1 },
  { name: 'viewImages[up]', maxCount: 1 },
  { name: 'viewImages[down]', maxCount: 1 }
]);

// Error handling middleware for file uploads
const handleUploadErrors = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  } else if (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
  next();
};

// Add Listing (with panorama generation and object detection)
router.post("/add", upload, handleUploadErrors, addListing);

// Generate 360 Preview (standalone endpoint)
router.post("/generate360", upload, handleUploadErrors, generate360Image);

// Get all Listings
router.get("/", getAllListings);

// Get single listing by ID
router.get("/:id", getSingleListing);

// Update listing
router.put("/update/:id", upload, handleUploadErrors, updateListing);


// Delete listing
router.delete("/:id", deleteListing);

module.exports = router;