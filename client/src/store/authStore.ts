import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

export type UserRole = "MasterAdmin" | "HOD" | "AssistantTeacher" | "Student";
const API_URL = "http://localhost:8080/api/auth";

interface User {
  id: string;
  username: string;
  email: string;
  mobileNo: string;
  collegeId: string;
  role?: UserRole;
  password: string;
  departmentId?: string;
  semester?: string;
  group?: string;
  department: string;
}

interface AuthStore {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
  initialize: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: true,
      isAuthenticated: false,

      initialize: () => {
        const { token, user } = get();
        if (token && user) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
        set({ isLoading: false });
      },

      login: async (email: string, password: string) => {
        try {
          const response = await axios.post(`${API_URL}/login`, {
            email,
            password,
          });
          const { token, user } = response.data;

          set({ user, token, isAuthenticated: true });
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          // Redirect logic would be handled in the component
        } catch (error) {
          if (axios.isAxiosError(error)) {
            throw new Error(
              error.response?.data?.message || "Login failed. Please try again."
            );
          }
          throw new Error("Login failed. Please try again.");
        }
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
        localStorage.removeItem("authStore"); // Clear persisted data
        delete axios.defaults.headers.common["Authorization"];

        // Optional: Call backend logout endpoint
        axios.post(`${API_URL}/logout`).catch(() => {});
      },

      refreshToken: async () => {
        try {
          const response = await axios.post(`${API_URL}/refresh-token`);
          const newToken = response.data.token;

          set({ token: newToken });
          axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
          return newToken;
        } catch (error) {
          get().logout();
          throw error;
        }
      },
    }),
    {
      name: "authStore", // name for the persisted data
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.initialize();
        }
      },
    }
  )
);

// Set up axios interceptor
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await useAuthStore.getState().refreshToken();
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
