const express = require("express");
const router = express.Router();

const {
  getUsers,
  deleteUser,
  getAllBookings,
  getStats,
} = require("../controllers/adminController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

// ALL ADMIN ROUTES PROTECTED
router.get("/users", protect, adminOnly, getUsers);

router.delete(
  "/users/:id",
  protect,
  adminOnly,
  deleteUser
);

router.get(
  "/bookings",
  protect,
  adminOnly,
  getAllBookings
);

router.get(
  "/stats",
  protect,
  adminOnly,
  getStats
);

module.exports = router;