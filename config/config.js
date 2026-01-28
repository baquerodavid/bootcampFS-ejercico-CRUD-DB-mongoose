const mongoose = require("mongoose");
require("dotenv").config();

const dbConnection = async () => {
  try {
    console.log(process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database successfully connected");
  } catch (error) {
    console.error(error);
    throw new Error("Error when starting the database");
  }
};

module.exports = {
  dbConnection,
};
