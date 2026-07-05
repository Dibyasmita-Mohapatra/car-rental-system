const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    bookingId: {
      type: String,
      unique: true,
    },

    carName: {
      type: String,
      required: true,
    },

    carImage: {
      type: String,
      default: "",
    },

    pricePerDay: {
      type: Number,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    pickupDate: {
      type: Date,
      required: true,
    },

    returnDate: {
      type: Date,
      required: true,
    },

    totalDays: {
      type: Number,
      required: true,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "In Progress",
        "Completed",
        "Cancelled",
      ],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "Booking",
  bookingSchema
);