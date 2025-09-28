const express = require("express");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRoutes");
const bookRouter = require("./routes/bookRoutes");
const connectDB = require("./config/db");
const rateLimit = require("express-rate-limit");

dotenv.config();
connectDB();
const app = express();

app.use(express.json());
//rate limiter
const limiter = rateLimit({
  max: 30,
  windowMs: 60 * 60 * 1000,
  message: "We received too many request from this IP",
});
const port = process.env.PORT || 3000;
app.use("/api", limiter);

app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
