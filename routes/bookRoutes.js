const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const validateBookField = require("../middleware/bookValidator");
const {
  getAllBooks,
  getBook,
  updateBook,
  createBook,
  deleteBook,
} = require("../controllers/bookController");

router.get("/", getAllBooks);
router.get("/:id", getBook);
router.post("/", auth, validateBookField, createBook);
router.put("/:id", auth, validateBookField, updateBook);
router.delete("/:id", auth, deleteBook);

module.exports = router;
