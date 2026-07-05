const User = require("../models/User");
const Booking = require("../models/Booking");

// GET ALL USERS
exports.getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// DELETE USER
exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};

// GET ALL BOOKINGS (ADMIN VIEW)
exports.getAllBookings = async (req, res) => {
  const bookings = await Booking.find()
    .populate("userId", "name email");

  res.json(bookings);
};

// GET DASHBOARD STATS
exports.getStats = async (req, res) => {
  const users = await User.countDocuments();
  const bookings = await Booking.countDocuments();

  const revenue = await Booking.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: "$totalPrice" },
      },
    },
  ]);

  res.json({
    totalUsers: users,
    totalBookings: bookings,
    totalRevenue: revenue[0]?.total || 0,
  });
};