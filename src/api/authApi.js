import api from "./base";

// LOGIN
export const loginApi = async ({ email, password }) => {
  try {
    const res = await api.post("/auth/login", { email, password });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Login failed");
  }
};

// REGISTER
export const registerApi = async ({ name, email, password }) => {
  try {
    const res = await api.post("/auth/register", {
      name,
      email,
      password,
    });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Register failed");
  }
};

// CURRENT USER
export const getMeApi = async () => {
  const token = localStorage.getItem("token");

  // ✅ important
  if (!token) return null;

  const res = await api.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    validateStatus: () => true,
  });

  if (res.status === 401) return null;

  if (res.status >= 400) {
    throw new Error(res.data?.message || "Auth check failed");
  }

  return res.data;
};

// LOGOUT
export const logoutApi = async () => {
  try {
    const res = await api.post("/auth/logout", null, {
      withCredentials: true,
    });

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    return res.data;
  } catch (err) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    throw new Error(err.response?.data?.message || "Logout failed");
  }
};