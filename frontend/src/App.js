import "./App.css";
import React, { useState } from "react";
import { RiEyeFill, RiEyeCloseFill } from "react-icons/ri";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Home from "./Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupForm />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}
// SignupForm.js

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Validate phone number length
    if (phoneNumber.length < 10) {
      setErrorMessage("Phone number must be at least 10 characters.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/api/signup", {
        username,
        email,
        fullName,
        password,
        phoneNumber,
      });

      const data = response.data;

      if (data.success) {
        // Signup successful, display success message
        setSuccessMessage("Account created successfully!");
        // Clear any previous error message
        setErrorMessage("");
        setTimeout(() => {
          navigate("/home"); // Replace "/home" with your actual home page route
        }, 1000);
      } else {
        // Signup failed, show error message
        setErrorMessage(data.message);
        // Clear any previous success message
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSignup}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Full Name:</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "95%" }}
          />
          {showPassword ? (
            <RiEyeFill
              onClick={togglePasswordVisibility}
              style={{
                position: "absolute",
                right: "1rem",
                fontSize: "1.5rem",
              }}
            />
          ) : (
            <RiEyeCloseFill
              onClick={togglePasswordVisibility}
              style={{
                position: "absolute",
                right: "1rem",
                fontSize: "1.5rem",
              }}
            />
          )}
        </div>
      </div>
      <div>
        <label>Phone Number:</label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">Sign Up</button>
      </div>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </form>
  );
};

export default App;
