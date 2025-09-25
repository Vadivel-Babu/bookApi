const Book = require("../models/bookModel");

//fetch all books
async function getAllBooks(req, res) {
  try {
    const getAllBooks = await Book.find();
    res.status(200).json(getAllBooks);
  } catch (error) {
    console.log(error);
  }
}

// Get a book by ID
async function getBook(req, res) {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    res.status(200).json({ data: book });
  } catch (error) {
    res.json(error);
  }
}

// Create a new book
async function createBook(req, res) {
  try {
    const { title, author, genre, price, isStock } = req.body;
    const newBook = { title, author, genre, price, isStock };
    await Book.create(newBook);
    res.status(201).json({ data: newBook });
  } catch (error) {
    res.json(error);
  }
}

// update the book
async function updateBook(req, res) {
  try {
    const { id } = req.params;
    const { title, author, genre, price, isStock } = req.body;
    const updatedBook = { title, author, genre, price, isStock };
    console.log(id);

    await Book.findByIdAndUpdate(id, updatedBook, {
      new: true,
    });
    res.status(200).json({ data: updatedBook });
  } catch (error) {
    res.json(error);
  }
}

// delete the book
async function deleteBook(req, res) {
  try {
    const { id } = req.params;

    await Book.deleteOne({ _id: id });
    res.json({ status: true, message: "Book Deleted" });
  } catch (error) {
    res.json(error);
  }
}

module.exports = {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};
