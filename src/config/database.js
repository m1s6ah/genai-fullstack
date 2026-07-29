const mongoose = require("mongoose");

async function connectToDB() {
  try {
    console.log("URI:", process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("Connected to database");
  } catch (err) {
    console.error("Full Error:");
    console.error(err);
  }
}

module.exports = connectToDB;