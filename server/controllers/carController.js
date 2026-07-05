const Car = require("../models/Car");

// GET ALL
exports.getCars = async (req, res) => {
  try {
    const cars = await Car.find();

    res.json(cars);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// GET SINGLE
exports.getCar = async (req, res) => {
  try {
    const car = await Car.findById(
      req.params.id
    );

    if (!car) {
      return res.status(404).json({
        message: "Car not found",
      });
    }

    res.json(car);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// CREATE
exports.createCar = async (req, res) => {
  try {
    const car = await Car.create(
      req.body
    );

    res.status(201).json(car);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// UPDATE
exports.updateCar = async (req, res) => {
  try {
    const car =
      await Car.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.json(car);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// DELETE
exports.deleteCar = async (req, res) => {
  try {
    await Car.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Car deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};