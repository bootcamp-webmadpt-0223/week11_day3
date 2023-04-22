const mongoose = require("mongoose");
require("dotenv").config();
const books = require("./books.json");
const Book = require("../models/Book.model");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("Connected to DB!");
    await Book.deleteMany();
    await Book.insertMany(books);
    // return Book.deleteMany().then(() => {
    //   return Book.insertMany(books);
    // });
  })
  .then(() => {
    mongoose.disconnect();
    console.log("Disconnected from DB!");
  });
