import React, { useState } from "react";
import "../styles/AuthenticatePage.css";
import GoogleIcon from "@mui/icons-material/Google";
import { auth, provider } from "../utils/firebase";
import { signInWithPopup } from "firebase/auth";
import { loginUser, createUser, logoutUser } from "../api";
import { useNavigate } from "react-router-dom";

const AuthenticationPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state before attempt
    setMessage(""); // Reset success message

    try {
      if (isLogin) {
        const response = await loginUser({ email, password });
        setMessage("Login successful!");
        navigate("/admin");
        
      } else {
        const response = await createUser({ firstName, lastName, email, password, confirmPassword });
        setMessage("User created successfully!");
        console.log("User created:", response);
      }
    } catch (error) {
      setError(`Authencation error ${error.code}` || "An error occurred");
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setMessage("");
    try {
      const response = await signInWithPopup(auth, provider)
      setMessage("Google login successful!");
      console.log("Google login response:", response);
    } catch (error) {
      console.error("Google login error:", error);
      setError(error.response?.data?.message || "Google login failed");
    }
  };

  return (
    <div className="auth-container">
      <h1 className="auth-title">{isLogin ? "Login" : "Sign Up"}</h1>
      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}
      <form onSubmit={handleLogin} className="auth-form">
        {!isLogin && (
          <>
            <div className="form-group">
              <label htmlFor="firstName" className="form-label">First Name:</label>
              <input
                type="text"
                id="firstName"
                className="form-input"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName" className="form-label">Last Name:</label>
              <input
                type="text"
                id="lastName"
                className="form-input"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </>
        )}
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            id="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            id="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {!isLogin && (
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              className="form-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        )}
        <button type="submit" className="auth-button">
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>
      <p className="social-text">Or continue with</p>
      <div className="social-buttons">
        <button onClick={handleGoogleLogin} className="social-button google">
          <GoogleIcon />
          Google
        </button>
      </div>
      <p className="toggle-text">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <button
          type="button"
          className="toggle-button"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Sign Up" : "Login"}
        </button>
      </p>
    </div>
  );
};

export default AuthenticationPage;
