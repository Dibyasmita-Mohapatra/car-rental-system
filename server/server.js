const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

// DB connection
const connectDB = require("./config/db");

// routes
const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const adminRoutes = require("./routes/adminRoutes");
const carRoutes = require(
  "./routes/carRoutes"
);

const app = express();

// =====================
// MIDDLEWARE
// =====================

// CORS (frontend connection)
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Local development
      "https://car-rental-system-seven-rouge.vercel.app/",
    ],
    credentials: true,
  })
);

app.use(express.json());

// =====================
// DATABASE CONNECT
// =====================
connectDB();

// =====================
// ROUTES
// =====================

// health check route
app.get("/", (req, res) => {
  res.send("🚗 Car Rental API Running Successfully");
});

// auth routes
app.use("/api/auth", authRoutes);

// booking routes (protected inside route file)
app.use("/api/bookings", bookingRoutes);

// admin routes (protected + role-based)
app.use("/api/admin", adminRoutes);

app.use(
  "/api/cars",
  carRoutes
);

// =====================
// ERROR HANDLING (basic)
// =====================
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    message: "Something went wrong on server",
  });
});

// =====================
// START SERVER
// =====================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
