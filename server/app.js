const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

// Connect to the MongoDB database
mongoose.connect(
  "mongodb+srv://MissC1010:Celina03@cluster0.pgjqpzh.mongodb.net/cars?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(cors());

// Set up middleware to parse JSON data
app.use(express.json());

// Set up routes for your API../models/car
app.use("/api/cars", require("../controllers/carsController"));

// Start the server
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server listening on port ${process.env.PORT || 5000}!`);
});
