const Book = require("../models/bookModel");

//fetch all books
async function getAllBooks(req, res) {
  try {
    const getAllBooks = await Book.find();
    return res.status(200).json({ status: true, data: getAllBooks });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
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
    return res.status(200).json({ status: true, data: book });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "An internal server error occurred.",
    });
  }
}

// Create a new book
async function createBook(req, res) {
  try {
    const { title, author, genre, price, inStock } = req.body;
    const newBook = { title, author, genre, price, inStock };
    await Book.create(newBook);
    return res.status(201).json({ status: true, data: newBook });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
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

    const updatedBook = { title, author, genre, price, inStock };

    await Book.findByIdAndUpdate(id, updatedBook, {
      new: true,
    });
    return res.status(201).json({ status: true, data: updatedBook });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
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
      return res
        .status(400)
        .json({ status: false, message: "Book cannot found" });
    }
    await Book.deleteOne({ _id: id });
    return res.json({ status: true, message: "Book Deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
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
