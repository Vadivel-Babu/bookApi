const express = require("express");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRoutes");
const bookRouter = require("./routes/bookRoutes");
const connectDB = require("./config/db");

connectDB();
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
