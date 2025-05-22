const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      validate: {
        validator: function(v) {
          return /^\d{10}$/.test(v); // Validate 10 digits
        },
        message: props => `${props.value} is not a valid phone number! Must be 10 digits.`
      }
    },
    amenities: {
      type: [String],
      required: true,
    },
    roomType: {
      type: String,
      required: true,
    },
    viewImages: {
      front: String,
      back: String,
      right: String,
      left: String,
      up: String,
      down: String
    },
    panoramaImage: {
      type: String
    },
    detectedObjects: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true,
  }
);

const Boarding =
  mongoose.models.boarding || mongoose.model("Boarding", listingSchema);

module.exports = Boarding;