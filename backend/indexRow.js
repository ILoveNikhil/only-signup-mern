// server.js

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

// Enable cross-origin resource sharing
app.use(cors());

// Parse incoming requests with JSON payloads
app.use(bodyParser.json());

// MongoDB setup (assuming you have MongoDB running locally)
const mongoURI = "mongodb://127.0.0.1:27017/Auth_MERN";
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => console.log("Connected to the database."));
db.on("error", (err) => console.error("Database connection error:", err));

// Create a user schema and model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    minlength: 10,
    maxlength: 13,
  },
});

const User = mongoose.model("User", userSchema);

// Signup route
app.post("/api/signup", async (req, res) => {
  const { username, email, fullName, password, phoneNumber } = req.body;

  try {
    // Check if the username, email, or phoneNumber already exist
    const existingUser = await User.findOne({
      $or: [{ username }, { email }, { phoneNumber }],
    });

    if (existingUser) {
      let errorMessage = "";
      if (existingUser.username === username) {
        errorMessage += "Username already exists. ";
      }
      if (existingUser.email === email) {
        errorMessage += "Email already exists. ";
      }
      if (existingUser.phoneNumber === phoneNumber) {
        errorMessage += "Phone number already exists. ";
      }

      return res.json({ success: false, message: errorMessage.trim() });
    }

    // Create a new user document
    const newUser = new User({
      username,
      email,
      fullName,
      password,
      phoneNumber,
    });
    await newUser.save();

    return res.json({ success: true, message: "Signup successful!" });
  } catch (error) {
    console.error("Error signing up:", error);
    return res.json({
      success: false,
      message: "Signup failed. Please try again later.",
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
