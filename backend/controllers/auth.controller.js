// const bcrypt = require("bcryptjs");
// const {
//   generateTokenAndSetCookie,
// } = require("../utils/generateTokenAndSetCookie.js");
// const { sendVerificationEmail } = require("../mailtrap/emails.js");
// const User = require("../models/User_model.js");

// // User signup
// const signup = async (req, res) => {
//   const { email, password, name } = req.body;

//   try {
//     // Check if all required fields are provided
//     if (!email || !password || !name) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     // Check if user already exists
//     const userAlreadyExists = await User.findOne({ email });
//     if (userAlreadyExists) {
//       return res.status(400).json({
//         success: false,
//         message: "User already exists",
//       });
//     }

//     // Hash password and create user
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const verificationToken = Math.floor(
//       100000 + Math.random() * 900000
//     ).toString();

//     const user = new User({
//       email,
//       password: hashedPassword,
//       name,
//       verificationToken,
//       verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
//     });

//     // Save the user in the database
//     await user.save();

//     // JWT token implementation (optional)
//     generateTokenAndSetCookie(res, user._id);

//     // Send verification email
//     await sendVerificationEmail(user.email, verificationToken);

//     return res.status(201).json({
//       success: true,
//       message: "User created successfully",
//       user: {
//         ...user._doc,
//         password: undefined, // Exclude password from response
//       },
//     });
//   } catch (error) {
//     // Log the actual error for debugging
//     console.error("Signup error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "An error occurred during signup",
//       error: error.message, // Provide the actual error message
//     });
//   }
// };

// const login = async (req, res) => {
//   res.send("Login route");
// };

// const logout = async (req, res) => {
//   res.send("Logout route");
// };

// module.exports = {
//   signup,
//   login,
//   logout,
// };

// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const {
//   generateTokenAndSetCookie,
// } = require("../utils/generateTokenAndSetCookie.js");
// const { sendVerificationEmail } = require("../mailtrap/emails.js");
// const User = require("../models/User_model.js");

// // User signup
// const signup = async (req, res) => {
//   const { email, password, name } = req.body;

//   try {
//     // Check if all required fields are provided
//     if (!email || !password || !name) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     // Check if user already exists
//     const userAlreadyExists = await User.findOne({ email });
//     if (userAlreadyExists) {
//       return res.status(400).json({
//         success: false,
//         message: "User already exists",
//       });
//     }

//     // Hash password and create user
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const verificationToken = Math.floor(
//       100000 + Math.random() * 900000
//     ).toString();

//     const user = new User({
//       email,
//       password: hashedPassword,
//       name,
//       verificationToken,
//       verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
//     });

//     // Save the user in the database
//     await user.save();

//     // Generate JWT token and set cookie
//     generateTokenAndSetCookie(res, user._id);

//     // Send verification email
//     await sendVerificationEmail("kalharasahan78@gmail.com", verificationToken);

//     return res.status(201).json({
//       success: true,
//       message: "User created successfully",
//       user: {
//         ...user._doc,
//         password: undefined, // Exclude password from response
//       },
//     });
//   } catch (error) {
//     console.error("Signup error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "An error occurred during signup",
//       error: error.message,
//     });
//   }
// };

// // User login
// const login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Check if email and password are provided
//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Email and password are required",
//       });
//     }

//     // Find user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid email or password",
//       });
//     }

//     // Compare passwords
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid email or password",
//       });
//     }

//     // Generate JWT token and set cookie
//     generateTokenAndSetCookie(res, user._id);

//     return res.status(200).json({
//       success: true,
//       message: "Login successful",
//       user: {
//         ...user._doc,
//         password: undefined, // Exclude password from response
//       },
//     });
//   } catch (error) {
//     console.error("Login error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "An error occurred during login",
//       error: error.message,
//     });
//   }
// };

// // User logout
// const logout = async (req, res) => {
//   try {
//     // Clear the token cookie
//     res.clearCookie("token");
//     return res.status(200).json({
//       success: true,
//       message: "Logout successful",
//     });
//   } catch (error) {
//     console.error("Logout error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "An error occurred during logout",
//       error: error.message,
//     });
//   }
// };

// module.exports = {
//   signup,
//   login,
//   logout,
// };

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  generateTokenAndSetCookie,
} = require("../utils/generateTokenAndSetCookie.js");
const { sendVerificationEmail } = require("../mailtrap/emails.js");
const User = require("../models/User_model.js");

// User signup
const signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    // Check if all required fields are provided
    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if user already exists
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString(); // Generate a 6-digit OTP

    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // OTP expires in 24 hours
    });

    // Save the user in the database
    await user.save();

    // Send verification email
    await sendVerificationEmail("kalharasahan78@gmail.com", verificationToken);

    return res.status(201).json({
      success: true,
      message:
        "User created successfully. Please check your email for the verification code.",
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred during signup",
      error: error.message,
    });
  }
};

// Verify OTP
const verifyOTP = async (req, res) => {
  const { email, verificationToken } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if the OTP matches and is not expired
    if (
      user.verificationToken === verificationToken &&
      user.verificationTokenExpiresAt > Date.now()
    ) {
      user.isVerified = true; // Mark the user as verified
      user.verificationToken = undefined; // Clear the OTP
      user.verificationTokenExpiresAt = undefined; // Clear the expiration time
      await user.save();

      return res.status(200).json({
        success: true,
        message: "Email verified successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }
  } catch (error) {
    console.error("OTP verification error:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred during OTP verification",
      error: error.message,
    });
  }
};

// User login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check if the user is verified
    if (!user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Please verify your email first",
      });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT token and set cookie
    generateTokenAndSetCookie(res, user._id);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        ...user._doc,
        password: undefined, // Exclude password from response
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred during login",
      error: error.message,
    });
  }
};

// User logout
const logout = async (req, res) => {
  try {
    // Clear the token cookie
    res.clearCookie("token");
    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred during logout",
      error: error.message,
    });
  }
};

module.exports = {
  signup,
  verifyOTP,
  login,
  logout,
};
