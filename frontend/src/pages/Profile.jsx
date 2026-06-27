import React, { useEffect, useState } from "react";
import { getProfile } from "../services/authService";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (savedUser?.id) {
      getProfile(savedUser.id).then((data) => {
        setUser(data);
      });
    }
  }, []);

  if (!user) {
    return (
      <div className="profile-page--empty">
        <h2>Please login first</h2>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h2 className="profile-card__title">My Profile</h2>

        <div className="profile-card__info">
          <div className="profile-card__row">
            <span className="profile-card__label">Name</span>
            <span className="profile-card__value">{user.fullName}</span>
          </div>

          <div className="profile-card__row">
            <span className="profile-card__label">Email</span>
            <span className="profile-card__value">{user.email}</span>
          </div>

          <div className="profile-card__row">
            <span className="profile-card__label">Mobile</span>
            <span className="profile-card__value">{user.mobile}</span>
          </div>

          <div className="profile-card__row">
            <span className="profile-card__label">Wallet</span>
            <span className="profile-card__value profile-card__value--wallet">
              ₹{user.walletBalance}
            </span>
          </div>

          <div className="profile-card__row">
            <span className="profile-card__label">Role</span>
            <span className="profile-card__badge">{user.role}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;