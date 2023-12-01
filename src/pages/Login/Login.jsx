import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: "DJ@4",
    password: "Dhunjam@2023",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    setLoginData((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
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
    <div>
      <h1>Venue Admin Login</h1>
      <label htmlFor="username">
        <input
          type="text"
          id="username"
          value={loginData.username}
          required
          onChange={handleChange}
        />
      </label>
      <label htmlFor="password">
        <input
          type="password"
          id="password"
          value={loginData.password}
          required
          onChange={handleChange}
        />
      </label>
      <button type="submit" onClick={handleSignIn}>
        Sign in
      </button>
      <a href="/">New Registration</a>
    </div>
  );
};

export default Login;
