function validateBookField(req, res, next) {
  const { title, author, genre, price, inStock } = req.body;
  if (typeof price !== "number") {
    return res.status(400).json({
      status: false,
      message: "Price should be in number not a string",
    });
  }

  if (price < 0) {
    return res.status(400).json({
      status: false,
      message: "Price not should be in negative number",
    });
  }

  if (typeof inStock !== "boolean") {
    return res.status(400).json({
      status: false,
      message: "inStock should be in boolean not a string",
    });
  }

  if (
    !title.trim().length ||
    !author.trim().length ||
    !genre.trim().length ||
    !price.toString().length ||
    !inStock.toString().length
  ) {
    return res.status(400).json({
      status: false,
      message: "All fields are required",
    });
  }
  next();
}

module.exports = validateBookField;
