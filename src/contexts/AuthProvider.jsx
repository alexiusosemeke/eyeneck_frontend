import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import AuthContext from "./AuthContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(() =>
    Boolean(localStorage.getItem("access")),
  );
  const [adminLoading, setAdminLoading] = useState(() =>
    Boolean(localStorage.getItem("access")),
  );

  const navigate = useNavigate();

  async function loadUser() {
    try {
      const response = await api.get("/users/me/");
      setUser(response.data);
      return response.data;
    } catch (e) {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      setUser(null);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  }

  async function loadAdmin() {
    try {
      const response = await api.get("/admin/users/me/");
      setAdmin(response.data);
      return response.data;
    } catch (error) {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      setAdmin(null);
      navigate("/admin/login");
    } finally {
      setAdminLoading(false);
    }
  }

  async function login(credentials) {
    const response = await api.post("/token/", credentials);

    const { access, refresh } = response.data;

    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);
    localStorage.setItem("authType", "user");

    return await loadUser();
  }

  async function adminLogin(credentials) {
    const response = await api.post("/admin/token/", credentials);

    const { access, refresh } = response.data;

    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);
    localStorage.setItem("authType", "admin");

    return await loadAdmin();
  }

  function logout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("authType");

    setUser(null);
    navigate("/login");
  }

  function adminLogout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("authType");

    setAdmin(null);
    navigate("login");
  }

  useEffect(() => {
    const access = localStorage.getItem("access");
    const authType = localStorage.getItem("authType");

    if (!access) {
      setLoading(false);
      return;
    }

    if (authType === "admin") {
      loadAdmin();
    } else {
      loadUser();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        admin,
        loading,
        adminLoading,
        isAuthenticated: !!user,
        isAdminAuthenticated: !!admin,
        login,
        adminLogin,
        logout,
        adminLogout,
        setUser,
        setAdmin,
        loadUser,
        loadAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
