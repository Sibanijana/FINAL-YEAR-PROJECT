// src/context/AuthContext.tsx
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useNavigate } from "react-router";
import axios from "axios";

type UserRole = "MasterAdmin" | "HOD" | "AssistantTeacher" | "Student";
const API_URL = "http://localhost:8080/api/auth";

interface User {
  id: string;
  email: string;
  role: UserRole;
  department?: string;
  username?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Initialize auth state and set up axios interceptors
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${storedToken}`;
      }
      setIsLoading(false);
    };

    initializeAuth();

    // Response interceptor for token refresh
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            await refreshToken();
            return axios(originalRequest);
          } catch (refreshError) {
            logout();
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  const refreshToken = useCallback(async () => {
    try {
      const response = await axios.post(`${API_URL}/refresh-token`);
      const newToken = response.data.token;
      setToken(newToken);
      localStorage.setItem("token", newToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
      return newToken;
    } catch (error) {
      logout();
      throw error;
    }
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const response = await axios.post(`${API_URL}/login`, {
          email,
          password,
        });

        const { token, user } = response.data;

        // Update state and storage
        setToken(token);
        setUser(user);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // Redirect based on role
        switch (user.role) {
          case "MasterAdmin":
            navigate("/master-admin");
            break;
          case "HOD":
          case "AssistantTeacher":
            navigate("/staff");
            break;
          case "Student":
            navigate("/student");
            break;
          default:
            navigate("/");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(
            error.response?.data?.message || "Login failed. Please try again."
          );
        }
        throw new Error("Login failed. Please try again.");
      }
    },
    [navigate]
  );

  const logout = useCallback(() => {
    // Clear state
    setToken(null);
    setUser(null);

    // Remove from storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Remove axios header
    delete axios.defaults.headers.common["Authorization"];

    // Redirect to login
    navigate("/login");

    // Optional: Call backend logout endpoint
    axios.post(`${API_URL}/logout`).catch(() => {});
  }, [navigate]);

  const value = {
    user,
    token,
    isAuthenticated: !!user && !!token,
    isLoading,
    login,
    logout,
    refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
