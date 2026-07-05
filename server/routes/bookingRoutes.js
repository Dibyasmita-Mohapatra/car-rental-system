const express = require("express");
const router = express.Router();

const Booking = require("../models/Booking");

const {
  protect,
} = require("../middleware/authMiddleware");

// =======================
// CREATE BOOKING
// =======================
router.post("/", protect, async (req, res) => {
  try {
    const booking = await Booking.create({
      user: req.user.id,

      bookingId:
        "CR-" +
        Math.floor(
          100000 + Math.random() * 900000
        ),

      carName: req.body.carName,

      carImage: req.body.carImage,

      pricePerDay: req.body.pricePerDay,

      location: req.body.location,

      pickupDate: req.body.pickupDate,

      returnDate: req.body.returnDate,

      totalDays: req.body.totalDays,

      totalPrice: req.body.totalPrice,

      status: "Confirmed",
    });

    res.status(201).json(booking);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Booking creation failed",
      error: err.message,
    });
  }
});

// =======================
// GET USER BOOKINGS
// =======================
router.get("/", protect, async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user.id,
    })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to fetch bookings",
      error: err.message,
    });
  }
});

// =======================
// DELETE BOOKING
// =======================
router.delete("/:id", protect, async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!booking) {
      return res.status(404).json({
        message:
          "Booking not found or not authorized",
      });
    }

    await booking.deleteOne();

    res.json({
      message:
        "Booking deleted successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Delete failed",
      error: err.message,
    });
  }
});

module.exports = router;