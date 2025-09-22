//fetch all books
async function getAllBooks(req, res) {
  try {
    res.send("Get all books");
  } catch (error) {
    console.log(error);
  }
}

// Get a book by ID
async function getBook(req, res) {
  try {
    res.send("Get a book by ID");
  } catch (error) {
    console.log(error);
  }
}

// Create a new book
async function createBook(req, res) {
  try {
    res.send("Book created");
  } catch (error) {
    console.log(error);
  }
}

// update the book
async function updateBook(req, res) {
  try {
    res.send("Book updated");
  } catch (error) {
    console.log(error);
  }
}

// delete the book
async function deleteBook(req, res) {
  try {
    res.send("Book deleted");
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};
