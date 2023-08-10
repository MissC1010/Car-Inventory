const express = require("express");
const router = express.Router();
const Car = require("../server/models/car");

// Get all cars in the database
router.get("/", async (req, res) => {
  const cars = await Car.find({});
  res.send(cars);
});

// Add a new car to the database
router.post("/", async (req, res) => {
  const newCar = new Car(req.body);
  await newCar.save();
  res.send(newCar);
});

// Update multiple cars with bulk update
router.put("/bulk", async (req, res) => {
  const { selectedCars, updates } = req.body;

  try {
    await Car.updateMany(
      { _id: { $in: selectedCars } }, // Filter by _id using $in operator
      { $set: updates } // Apply updates using $set operator
    );

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Update information about a single car
router.put("/:id", async (req, res) => {
  const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send(updatedCar);
});

// Update information about more than one car
router.put("/", async (req, res) => {
  const updatedCars = await Car.updateMany({}, req.body);
  res.send(updatedCars);
});

// Delete a specific document
router.delete("/:id", async (req, res) => {
  const deletedCar = await Car.findByIdAndDelete(req.params.id);
  res.send(deletedCar);
});

// List all the information for all cars in your database.
router.get("/all", async (req, res) => {
  const cars = await Car.find({});
  res.send(cars);
});

// List model, make, registration number, and current owner for all cars older than 5 years.
router.get("/older", async (req, res) => {
  const cars = await Car.find({ year: { $lt: new Date().getFullYear() - 5 } });
  const filteredCars = cars.map((car) => {
    return {
      make: car.make,
      model: car.model,
      registrationNumber: car.registrationNumber,
      currentOwner: car.currentOwner,
    };
  });
  res.send(filteredCars);
});

module.exports = router;
