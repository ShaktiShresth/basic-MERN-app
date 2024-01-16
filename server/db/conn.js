const mongoose = require("mongoose");
const DB_URL = process.env.MONGO_DB_URL;

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Database is connected successfully.");
  })
  .catch((error) => {
    console.log("Database connection error.", error);
  });
