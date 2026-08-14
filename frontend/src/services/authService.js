import api from "./api";

// ==========================
// Register User
// ==========================
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    return error.response?.data || { message: "Registration failed" };
  }
};

// ==========================
// Login User
// ==========================
export const loginUser = async (loginData) => {
  try {
    const response = await api.post("/auth/login", loginData);
    return response.data;
  } catch (error) {
    return error.response?.data || { message: "Login failed" };
  }
};

// ==========================
// Get Profile
// ==========================
export const getProfile = async (userId) => {
  try {
    const response = await api.get(`/profile/${userId}`);
    return response.data;
  } catch (error) {
    return error.response?.data || { message: "Failed to fetch profile" };
  }
};

// ==========================
// Update Profile
// ==========================
export const updateProfile = async (userId, profileData) => {
  try {
    const response = await api.put(`/profile/${userId}`, profileData);
    return response.data;
  } catch (error) {
    return error.response?.data || { message: "Failed to update profile" };
  }
};

// ==========================
// Change Password
// ==========================
export const changePassword = async (userId, passwordData) => {
  try {
    const response = await api.put(`/profile/${userId}/password`, passwordData);
    return response.data;
  } catch (error) {
    return error.response?.data || "Failed to change password";
  }
};