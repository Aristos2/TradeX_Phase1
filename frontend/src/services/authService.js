import API_BASE_URL from "./api";

// ==========================
// Register User
// ==========================
export const registerUser = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  return response.json();
};

// ==========================
// Login User
// ==========================
export const loginUser = async (loginData) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });

  return response.json();
};

// ==========================
// Get Profile
// ==========================
export const getProfile = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/profile/${userId}`);
  return response.json();
};

// ==========================
// Update Profile
// ==========================
export const updateProfile = async (userId, profileData) => {
  const response = await fetch(`${API_BASE_URL}/profile/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profileData),
  });

  return response.json();
};

// ==========================
// Change Password
// ==========================
export const changePassword = async (userId, passwordData) => {
  const response = await fetch(
    `${API_BASE_URL}/profile/${userId}/password`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(passwordData),
    }
  );

  return response.text();
};