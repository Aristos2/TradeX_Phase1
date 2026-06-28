import React, { useEffect, useState } from "react";
import {
  getProfile,
  updateProfile,
  changePassword,
} from "../services/authService";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Toggle visibility
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  // Feedback
  const [profileSuccess, setProfileSuccess] = useState("");
  const [profileError, setProfileError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Profile fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [bio, setBio] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  // Password fields
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // =========================
  // Load Profile
  // =========================
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser?.id) {
      getProfile(savedUser.id).then((data) => {
        setUser(data);
        setFirstName(data.firstName || data.first_name || "");
        setLastName(data.lastName || data.last_name || "");
        setMobile(data.mobile || "");
        setBio(data.bio || "");
        setDateOfBirth(data.dateOfBirth || data.date_of_birth || "");
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  // =========================
  // Helpers
  // =========================
  const getField = (user, ...keys) => {
    for (const k of keys) if (user[k]) return user[k];
    return null;
  };

  const getInitials = () => {
    const fn = getField(user, "firstName", "first_name") || "";
    const ln = getField(user, "lastName", "last_name") || "";
    if (fn && ln) return `${fn[0]}${ln[0]}`.toUpperCase();
    const full = getField(user, "fullName", "full_name") || "";
    if (full) {
      const parts = full.trim().split(" ");
      return parts.length >= 2
        ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
        : parts[0][0].toUpperCase();
    }
    return "U";
  };

  const formatDate = (val) => {
    if (!val) return "—";
    const d = new Date(val);
    return isNaN(d) ? val : d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  };

  const formatWallet = (val) =>
    val != null ? `₹${Number(val).toLocaleString("en-IN")}` : "—";

  // =========================
  // Update Profile
  // =========================
  const handleUpdateProfile = async () => {
    setProfileError("");
    setProfileSuccess("");
    try {
      const savedUser = JSON.parse(localStorage.getItem("user"));
      const updated = await updateProfile(savedUser.id, {
        firstName,
        lastName,
        mobile,
        bio,
        dateOfBirth,
      });
      setUser(updated);
      setProfileSuccess("Profile updated successfully.");
      setTimeout(() => {
        setShowEditProfile(false);
        setProfileSuccess("");
      }, 2000);
    } catch {
      setProfileError("Failed to update profile. Please try again.");
    }
  };

  const handleCancelEdit = () => {
    // Reset fields to current user values
    setFirstName(getField(user, "firstName", "first_name") || "");
    setLastName(getField(user, "lastName", "last_name") || "");
    setMobile(user.mobile || "");
    setBio(user.bio || "");
    setDateOfBirth(getField(user, "dateOfBirth", "date_of_birth") || "");
    setProfileError("");
    setProfileSuccess("");
    setShowEditProfile(false);
  };

  // =========================
  // Change Password
  // =========================
  const handleChangePassword = async () => {
    setPasswordError("");
    setPasswordSuccess("");
    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }
    try {
      const savedUser = JSON.parse(localStorage.getItem("user"));
      await changePassword(savedUser.id, { oldPassword, newPassword, confirmPassword });
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordSuccess("Password changed successfully.");
      setTimeout(() => {
        setShowChangePassword(false);
        setPasswordSuccess("");
      }, 2000);
    } catch {
      setPasswordError("Incorrect current password or server error.");
    }
  };

  const handleCancelPassword = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordError("");
    setPasswordSuccess("");
    setShowChangePassword(false);
  };

  // =========================
  // States
  // =========================
  if (loading) {
    return (
      <div className="profile-page profile-page--state">
        <div className="profile-state__spinner" />
        <p className="profile-state__text">Loading profile…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="profile-page profile-page--state">
        <p className="profile-state__text">Please log in to view your profile.</p>
      </div>
    );
  }

  const fullName   = getField(user, "fullName", "full_name") || `${getField(user, "firstName", "first_name") || ""} ${getField(user, "lastName", "last_name") || ""}`.trim();
  const dob        = getField(user, "dateOfBirth", "date_of_birth");
  const wallet     = getField(user, "walletBalance", "wallet_balance");
  const createdAt  = getField(user, "createdAt", "created_at");
  const profileImg = getField(user, "profileImageUrl", "profile_image_url");

  return (
    <div className="profile-page">
      <div className="profile-layout">

        {/* ── LEFT: IDENTITY PANEL ── */}
        <aside className="profile-identity">
          <div className="profile-identity__avatar">
            {profileImg
              ? <img src={profileImg} alt="avatar" className="profile-identity__avatar-img" />
              : getInitials()
            }
          </div>

          <h2 className="profile-identity__name">{fullName || "—"}</h2>
          <p className="profile-identity__email">{user.email}</p>
          <span className="profile-identity__role-badge">{user.role}</span>

          <div className="profile-identity__stats">
            <div className="profile-identity__stat">
              <span className="profile-identity__stat-label">Wallet Balance</span>
              <span className="profile-identity__stat-value profile-identity__stat-value--wallet">
                {formatWallet(wallet)}
              </span>
            </div>

            <div className="profile-identity__stat">
              <span className="profile-identity__stat-label">Mobile</span>
              <span className="profile-identity__stat-value">{user.mobile || "—"}</span>
            </div>

            <div className="profile-identity__stat">
              <span className="profile-identity__stat-label">Date of Birth</span>
              <span className="profile-identity__stat-value">{formatDate(dob)}</span>
            </div>

            <div className="profile-identity__stat">
              <span className="profile-identity__stat-label">Member Since</span>
              <span className="profile-identity__stat-value">{formatDate(createdAt)}</span>
            </div>
          </div>

          {user.bio && (
            <p className="profile-identity__bio">"{user.bio}"</p>
          )}
        </aside>

        {/* ── RIGHT: PANELS ── */}
        <main className="profile-forms">

          {/* ── EDIT PROFILE ── */}
          <section className="profile-section">
            <div className="profile-section__header">
              <h3 className="profile-section__title">Profile Details</h3>
              {!showEditProfile && (
                <button
                  className="profile-section__toggle-btn"
                  onClick={() => { setShowEditProfile(true); setShowChangePassword(false); }}
                >
                  ✏️ Edit Profile
                </button>
              )}
            </div>

            {/* Read-only info rows (always visible) */}
            <div className="profile-info__grid">
              <div className="profile-info__item">
                <span className="profile-info__label">First Name</span>
                <span className="profile-info__value">{getField(user, "firstName", "first_name") || "—"}</span>
              </div>
              <div className="profile-info__item">
                <span className="profile-info__label">Last Name</span>
                <span className="profile-info__value">{getField(user, "lastName", "last_name") || "—"}</span>
              </div>
              <div className="profile-info__item">
                <span className="profile-info__label">Email</span>
                <span className="profile-info__value">{user.email}</span>
              </div>
              <div className="profile-info__item">
                <span className="profile-info__label">Mobile</span>
                <span className="profile-info__value">{user.mobile || "—"}</span>
              </div>
              <div className="profile-info__item">
                <span className="profile-info__label">Date of Birth</span>
                <span className="profile-info__value">{formatDate(dob)}</span>
              </div>
              <div className="profile-info__item profile-info__item--full">
                <span className="profile-info__label">Bio</span>
                <span className="profile-info__value">{user.bio || "—"}</span>
              </div>
            </div>

            {/* Collapsible edit form */}
            {showEditProfile && (
              <div className="profile-edit-form">
                <div className="profile-divider" />

                <div className="profile-form__row">
                  <div className="profile-form__field">
                    <label className="profile-form__label">First Name</label>
                    <input className="profile-form__input" type="text" placeholder="First Name"
                      value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  </div>
                  <div className="profile-form__field">
                    <label className="profile-form__label">Last Name</label>
                    <input className="profile-form__input" type="text" placeholder="Last Name"
                      value={lastName} onChange={(e) => setLastName(e.target.value)} />
                  </div>
                </div>

                <div className="profile-form__field">
                  <label className="profile-form__label">Mobile</label>
                  <input className="profile-form__input" type="text" placeholder="Mobile number"
                    value={mobile} onChange={(e) => setMobile(e.target.value)} />
                </div>

                <div className="profile-form__field">
                  <label className="profile-form__label">Date of Birth</label>
                  <input className="profile-form__input" type="date"
                    value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
                </div>

                <div className="profile-form__field">
                  <label className="profile-form__label">Bio</label>
                  <textarea className="profile-form__input profile-form__textarea" placeholder="Write a short bio…"
                    value={bio} onChange={(e) => setBio(e.target.value)} />
                </div>

                {profileSuccess && <p className="profile-form__feedback profile-form__feedback--success">{profileSuccess}</p>}
                {profileError   && <p className="profile-form__feedback profile-form__feedback--error">{profileError}</p>}

                <div className="profile-form__actions">
                  <button className="profile-form__btn" onClick={handleUpdateProfile}>Save Changes</button>
                  <button className="profile-form__btn profile-form__btn--ghost" onClick={handleCancelEdit}>Cancel</button>
                </div>
              </div>
            )}
          </section>

          <div className="profile-divider" />

          {/* ── CHANGE PASSWORD ── */}
          <section className="profile-section">
            <div className="profile-section__header">
              <h3 className="profile-section__title">Security</h3>
              {!showChangePassword && (
                <button
                  className="profile-section__toggle-btn"
                  onClick={() => { setShowChangePassword(true); setShowEditProfile(false); }}
                >
                  🔒 Change Password
                </button>
              )}
            </div>

            {!showChangePassword && (
              <p className="profile-info__value profile-info__value--muted">
                Password was last changed on account creation. Keep your account secure.
              </p>
            )}

            {showChangePassword && (
              <div className="profile-edit-form">
                <div className="profile-form__field">
                  <label className="profile-form__label">Current Password</label>
                  <input className="profile-form__input" type="password" placeholder="Enter current password"
                    value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                </div>

                <div className="profile-form__field">
                  <label className="profile-form__label">New Password</label>
                  <input className="profile-form__input" type="password" placeholder="Enter new password"
                    value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </div>

                <div className="profile-form__field">
                  <label className="profile-form__label">Confirm New Password</label>
                  <input className="profile-form__input" type="password" placeholder="Confirm new password"
                    value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>

                {passwordSuccess && <p className="profile-form__feedback profile-form__feedback--success">{passwordSuccess}</p>}
                {passwordError   && <p className="profile-form__feedback profile-form__feedback--error">{passwordError}</p>}

                <div className="profile-form__actions">
                  <button className="profile-form__btn" onClick={handleChangePassword}>Update Password</button>
                  <button className="profile-form__btn profile-form__btn--ghost" onClick={handleCancelPassword}>Cancel</button>
                </div>
              </div>
            )}
          </section>

        </main>
      </div>
    </div>
  );
};

export default Profile;