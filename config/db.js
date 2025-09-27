const mongoose = require("mongoose");

async function connectDB() {
  try {
    const con = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("db connected " + con.connection.host);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

module.exports = connectDB;
