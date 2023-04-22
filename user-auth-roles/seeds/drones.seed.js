const mongoose = require("mongoose");
require("dotenv").config();
const drones = require("./drones");
const Drone = require("../models/Drone.model");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("Connected to DB!");
    await Drone.deleteMany();
    await Drone.insertMany(drones);
  })
  .then(() => {
    mongoose.disconnect();
    console.log("Disconnected from DB!");
  });