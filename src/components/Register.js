import React, { useState } from "react";
import { auth } from "../components/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "./validation";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../components/firebase";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();

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
  
    if (!termsAccepted) {
      alert("You must agree to the Terms of Service before registering.");
      return;
    }
  
    // Firebase function to create a user in Firestore
    const createUserInFirestore = async (email) => {
      const userRef = doc(db, "users", email);
      await setDoc(userRef, {
        email: email,
        account: true,
      });
    };
  
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await createUserInFirestore(email); // Call the function after successful registration
      alert("User successfully registered!");
      navigate("/");
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert(`This email is already registered. Click <a href="/login">here</a> to login.`);
      } else {
        alert("Error registering user: " + error.message);
      }
    }
  }; 

  return (
    <div className="Register">
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
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
        <label>
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
          />
          I agree to the <a href="/terms-of-service" target="_blank">Terms of Service</a>
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
