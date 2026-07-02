const mongoose = require("mongoose");

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database is connected now");
  } catch (err) {
    console.log("Error in connection " + err.message);
  }
}

module.exports = connectToDB;
