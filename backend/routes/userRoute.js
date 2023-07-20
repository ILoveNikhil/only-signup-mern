import express from "express";

const router = express();

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
