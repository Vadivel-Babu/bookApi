const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const {
  getAllBooks,
  getBook,
  updateBook,
  createBook,
  deleteBook,
} = require("../controllers/bookController");

router.get("/", getAllBooks);
router.get("/:id", getBook);
router.post("/", auth, createBook);
router.put("/:id", auth, updateBook);
router.delete("/:id", auth, deleteBook);

module.exports = router;
