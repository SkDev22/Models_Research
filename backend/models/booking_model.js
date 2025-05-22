const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    FirstName: {
      type: String,
      required: true,
    },
    LastName: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    Phone: {
      type: String,
      required: true,
    },
    nic: {
      type: String,
      required: true,
    },
    BookingDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Booking =
  mongoose.models.booking || mongoose.model("Booking", bookingSchema);

module.exports = Booking;
