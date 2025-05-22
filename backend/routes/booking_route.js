const express = require("express");
const {
  getAllBookings,
  addBookings,
  getSingleBookings,
  updateBooking,
  deleteBooking,
} = require("../controllers/booking_controller");
const router = express.Router();

router.get("/", getAllBookings);
router.post("/add", addBookings);
router.get("/:id", getSingleBookings);
router.put("/update/:id", updateBooking);
router.delete("/delete/:id", deleteBooking);

module.exports = router;
