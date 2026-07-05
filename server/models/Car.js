const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    brand: {
      type: String,
      required: true,
    },

    fuel: {
      type: String,
      required: true,
    },

    transmission: {
      type: String,
      required: true,
    },

    seats: {
      type: Number,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      default: 4.5,
    },

    price: {
      type: Number,
      required: true,
    },

    images: {
      type: [String],
      default: [],
    },

    description: {
      type: String,
      required: true,
    },

    features: {
      type: [String],
      default: [],
    },

    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Car",
  carSchema
);