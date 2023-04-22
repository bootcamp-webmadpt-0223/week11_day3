const express = require("express");
const router = express.Router();
const Book = require("../models/Book.model");

router.get("/", async (req, res) => {
  const books = await Book.find({});
  res.render("books/books-list", { books });
});

router.post("/", async (req, res) => {
  await Book.create(req.body);
  res.redirect("/books");
});

router.get("/create", (req, res) => {
  res.render("books/book-form");
});

router.get("/:bookId", async (req, res) => {
  const book = await Book.findById(req.params.bookId);
  res.render("books/book-detail", { book });
});

module.exports = router;
