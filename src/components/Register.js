import React, { useState } from "react";
import { auth } from "C:/Users/drewv/Downloads/__pycache__/newBlogSite/ai-now/ai-now/src/components/firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;
    return re.test(password);
  };

  const formatName = (name) => {
    return name
      .trim()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      alert("Please enter a valid email.");
      return;
    }

    if (!validatePassword(password)) {
      alert("Password must be at least 8 characters long and contain at least 1 number.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }


    const formattedFirstName = formatName(firstName);
    const formattedLastName = formatName(lastName);
    const formattedName = formattedFirstName + " " + formattedLastName;

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await user.updateProfile({ displayName: formattedName });
      alert("User successfully registered. Please check your email for verification.");
      navigate("/");
    } catch (error) {
      alert("Error registering user: " + error.message);
    }
  };

  return (
    <div className="Register">
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <label>First Name:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <label>Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <br />
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
