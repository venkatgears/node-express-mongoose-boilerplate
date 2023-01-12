const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

// Connect MongoDB at default port 27017.
const DBconnect = () =>
  mongoose.connect(process.env.dbUri, (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection: " + err);
    }
  });

module.exports = DBconnect;
