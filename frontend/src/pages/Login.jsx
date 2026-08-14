import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = await loginUser(formData);

    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      navigate("/profile");
    } else {
      alert(data.message || "Login failed");
    }

    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-card">

        {/* Brand */}
        <div className="login-card__brand">
          <div className="login-card__logo">Z</div>
          <span className="login-card__brand-name">
            Zero<span>dha</span>
          </span>
        </div>

        {/* Heading */}
        <h2 className="login-card__heading">Welcome back</h2>
        <p className="login-card__subheading">
          Sign in to your trading account
        </p>

        {/* Form */}
        <form className="login-form" onSubmit={handleLogin}>

          <div className="login-form__group">
            <label className="login-form__label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              className="login-form__input"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>

          <div className="login-form__group">
            <label className="login-form__label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              className="login-form__input"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
          </div>

          <Link to="/forgot-password" className="login-form__forgot">
            Forgot password?
          </Link>

          <button
            type="submit"
            className="login-form__submit"
            disabled={loading}
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>

        </form>

        {/* Footer */}
        <p className="login-card__footer">
          New here?{" "}
          <Link to="/register">Create an account</Link>
        </p>

      </div>
    </div>
  );
};

export default Login;