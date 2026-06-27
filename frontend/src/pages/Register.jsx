import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";
import "./Register.css";

// ── Password strength helper ─────────────────────────────
const getPasswordStrength = (pwd) => {
  if (!pwd) return { score: 0, label: "", color: "" };
  let score = 0;
  if (pwd.length >= 8)          score++;
  if (/[A-Z]/.test(pwd))        score++;
  if (/[0-9]/.test(pwd))        score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;

  const levels = [
    { label: "",         color: "#eeeeee", width: "0%" },
    { label: "Weak",     color: "#e24b4a", width: "25%" },
    { label: "Fair",     color: "#f59e0b", width: "50%" },
    { label: "Good",     color: "#3b82f6", width: "75%" },
    { label: "Strong",   color: "#178051", width: "100%" },
  ];
  return levels[score];
};

// ── Validators ───────────────────────────────────────────
const validate = (formData) => {
  const errors = {};
  if (!formData.fullName.trim())
    errors.fullName = "Full name is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
    errors.email = "Enter a valid email";
  if (formData.password.length < 8)
    errors.password = "At least 8 characters";
  if (!/^[0-9]{10}$/.test(formData.mobile))
    errors.mobile = "Enter a valid 10-digit number";
  return errors;
};

// ── Component ────────────────────────────────────────────
const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    mobile: "",
  });

  const [errors,  setErrors]  = useState({});
  const [loading, setLoading] = useState(false);

  const strength = getPasswordStrength(formData.password);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on edit
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    const data = await registerUser(formData);

    if (data.id) {
      navigate("/login", { state: { registered: true } });
    } else {
      setErrors({ form: data.message || "Registration failed. Try again." });
    }
    setLoading(false);
  };

  return (
    <div className="register-page">
      <div className="register-card">

        {/* Brand */}
        <div className="register-card__brand">
          <div className="register-card__logo">Z</div>
          <span className="register-card__brand-name">
            Zero<span>dha</span>
          </span>
        </div>

        <h2 className="register-card__heading">Create account</h2>
        <p className="register-card__subheading">
          Start your trading journey today
        </p>

        <form className="register-form" onSubmit={handleRegister} noValidate>

          {/* Full name + Email row */}
          <div className="register-form__row">
            <div className="register-form__group">
              <label className="register-form__label" htmlFor="fullName">
                Full name
              </label>
              <input
                id="fullName"
                className={`register-form__input ${errors.fullName ? "error" : ""}`}
                type="text"
                name="fullName"
                placeholder="Roaster K"
                value={formData.fullName}
                onChange={handleChange}
                autoComplete="name"
              />
              {errors.fullName && (
                <span className="register-form__error">{errors.fullName}</span>
              )}
            </div>

            <div className="register-form__group">
              <label className="register-form__label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                className={`register-form__input ${errors.email ? "error" : ""}`}
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
              />
              {errors.email && (
                <span className="register-form__error">{errors.email}</span>
              )}
            </div>
          </div>

          {/* Password */}
          <div className="register-form__group">
            <label className="register-form__label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              className={`register-form__input ${errors.password ? "error" : ""}`}
              type="password"
              name="password"
              placeholder="Min. 8 characters"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
            />
            {/* Strength bar */}
            {formData.password && (
              <div className="password-strength">
                <div className="password-strength__bar">
                  <div
                    className="password-strength__fill"
                    style={{
                      width: strength.width,
                      background: strength.color,
                    }}
                  />
                </div>
                <span
                  className="password-strength__label"
                  style={{ color: strength.color }}
                >
                  {strength.label}
                </span>
              </div>
            )}
            {errors.password && (
              <span className="register-form__error">{errors.password}</span>
            )}
          </div>

          {/* Mobile */}
          <div className="register-form__group">
            <label className="register-form__label" htmlFor="mobile">
              Mobile number
            </label>
            <div className="register-form__phone-wrap">
              <span className="register-form__phone-prefix">🇮🇳 +91</span>
              <input
                id="mobile"
                className="register-form__phone-input"
                type="tel"
                name="mobile"
                placeholder="98765 43210"
                value={formData.mobile}
                onChange={handleChange}
                maxLength={10}
                autoComplete="tel"
              />
            </div>
            {errors.mobile && (
              <span className="register-form__error">{errors.mobile}</span>
            )}
          </div>

          {/* Form-level error */}
          {errors.form && (
            <span className="register-form__error" style={{ textAlign: "center" }}>
              {errors.form}
            </span>
          )}

          <button
            type="submit"
            className="register-form__submit"
            disabled={loading}
          >
            {loading ? "Creating account…" : "Create account"}
          </button>

        </form>

        <p className="register-card__footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>

      </div>
    </div>
  );
};

export default Register;