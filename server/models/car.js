const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  make: String,
  model: String,
  registrationNumber: String,
  currentOwner: String,
  year: Number,
});

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
