const Booking = require("../models/Booking");

// CREATE BOOKING
const createBooking = async (req, res) => {
  try {
    const {
      carName,
      carImage,
      pricePerDay,
      location,
      pickupDate,
      returnDate,
      totalDays,
      totalPrice,
    } = req.body;

    const booking = await Booking.create({
      user: req.user.id,

      bookingId:
        "CR-" +
        Math.floor(
          100000 + Math.random() * 900000
        ),

      carName,

      carImage,

      pricePerDay,

      location,

      pickupDate,

      returnDate,

      totalDays,

      totalPrice,

      status: "Confirmed",
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (err) {
    res.status(500).json({
      message: "Booking failed",
      error: err.message,
    });
  }
};

// GET USER BOOKINGS
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch bookings",
      error: err.message,
    });
  }
};

// DELETE BOOKING
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    // ensure user owns booking
    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    await booking.deleteOne();

    res.json({
      message: "Booking cancelled successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Delete failed",
      error: err.message,
    });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  deleteBooking,
};