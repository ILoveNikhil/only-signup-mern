import mongoose from "mongoose";

// MongoDB setup (assuming you have MongoDB running locally)
const mongoURI = "mongodb://127.0.0.1:27017/Auth_MERN";
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => console.log("Connected to the database."));
db.on("error", (err) => console.error("Database connection error:", err));
