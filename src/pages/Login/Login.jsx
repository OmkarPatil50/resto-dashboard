import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: "DJ@4",
    password: "Dhunjam@2023",
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setLoginData((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };
  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSignIn = async () => {
    try {
      const response = await fetch(
        "https://stg.dhunjam.in/account/admin/login",
        {
          method: "POST",
          body: JSON.stringify(loginData),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      const result = await response.json();
      if (result.data.id) {
        navigate("/dashboard", {
          state: result.data.id,
        });
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <div className="page flex-center">
      <div className="login-container flex-center flex-col">
        <h1 className="login-title">Venue Admin Login</h1>
        <label htmlFor="username" className="input-label">
          <input
            type="text"
            id="username"
            value={loginData.username}
            required
            onChange={handleChange}
            className="input-field"
            placeholder="username"
          />
        </label>
        <label htmlFor="password" className="input-label relative-label">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={loginData.password}
            required
            onChange={handleChange}
            className="input-field"
            placeholder="password"
          />
          <span
            className={`eye-icon ${showPassword ? "show" : ""}`}
            onClick={handleTogglePassword}
          >
            👁️
          </span>
        </label>
        <button type="submit" onClick={handleSignIn} className="save-button">
          Sign in
        </button>
        <a href="/" className="registration-link">
          New Registration ?
        </a>
      </div>
    </div>
  );
};

export default Login;
