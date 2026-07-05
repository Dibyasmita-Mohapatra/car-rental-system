const express = require("express");

const router = express.Router();

const {
  getCars,
  getCar,
  createCar,
  updateCar,
  deleteCar,
} = require(
  "../controllers/carController"
);

const {
  protect,
  adminOnly,
} = require(
  "../middleware/authMiddleware"
);

// public
router.get("/", getCars);

router.get("/:id", getCar);

// admin
router.post(
  "/",
  protect,
  adminOnly,
  createCar
);

router.put(
  "/:id",
  protect,
  adminOnly,
  updateCar
);

router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteCar
);

module.exports = router;