const Book = require("../models/bookModel");

//fetch all books
async function getAllBooks(req, res) {
  try {
    const getAllBooks = await Book.find();
    res.status(200).json({ status: true, data: getAllBooks });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "An internal server error occurred.",
    });
  }
}

// Get a book by ID
async function getBook(req, res) {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res
        .status(400)
        .json({ status: false, message: "Book cannot found" });
    }
    res.status(200).json({ status: true, data: book });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "An internal server error occurred.",
    });
  }
}

// Create a new book
async function createBook(req, res) {
  try {
    const { title, author, genre, price, inStock } = req.body;
    console.log(title, author, genre, price, inStock);

    if (!title.trim().length || !author.trim().length || !genre.trim().length) {
      return res.status(400).json({
        status: false,
        message: "All fields are required",
      });
    }
    const newBook = { title, author, genre, price, inStock };
    await Book.create(newBook);
    res.status(201).json({ status: true, data: newBook });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "An internal server error occurred.",
    });
  }
}

// update the book
async function updateBook(req, res) {
  try {
    const { id } = req.params;
    const { title, author, genre, price, inStock } = req.body;
    const book = await Book.findById(id);
    if (!book) {
      return res
        .status(400)
        .json({ status: false, message: "Book cannot found" });
    }
    if (!title.trim().length || !author.trim().length || !genre.trim().length) {
      return res.status(400).json({
        status: false,
        message: "All fields are required",
      });
    }
    const updatedBook = { title, author, genre, price, inStock };

    await Book.findByIdAndUpdate(id, updatedBook, {
      new: true,
    });
    res.status(201).json({ status: true, data: updatedBook });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "An internal server error occurred.",
    });
  }
}

// delete the book
async function deleteBook(req, res) {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      res.status(400).json({ status: false, message: "Book cannot found" });
    }
    await Book.deleteOne({ _id: id });
    res.json({ status: true, message: "Book Deleted" });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "An internal server error occurred.",
    });
  }
}

module.exports = {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};
