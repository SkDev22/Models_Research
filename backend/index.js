const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const listingRoute = require("./routes/listings_route.js");
const bookingRoute = require("./routes/booking_route.js");
const authRoutes = require("./routes/auth.route.js");
const path = require('path');


//Connect the server
const app = express();
const port = process.env.PORT || 5050;

//Middleware
app.use(express.json());
app.use(cors());

//DB Connection
mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("DB Connected"))
  .catch((err) => {
    console.log(err);
  });

//Routes
app.use("/listings", listingRoute);
app.use("/bookings", bookingRoute);
app.use("/api/auth", authRoutes);

// Image Upload Route
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
