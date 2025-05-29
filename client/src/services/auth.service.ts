import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

type UserRole = "MasterAdmin" | "HOD" | "AssistantTeacher" | "Student";

interface RegisterData {
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

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    role: UserRole;
    department?: string;
  };
}

export const authService = {
  registerStudent: async (data: Omit<RegisterData, "role">) => {
    try {
      const response = await axios.post(`${API_URL}/register/student`, {
        username: data.username,
        email: data.email,
        mobileNo: data.mobileNo,
        collegeId: data.collegeId,
        password: data.password,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message ||
            error.response?.data?.error ||
            "Registration failed. Please try again."
        );
      }
      throw new Error("Registration failed. Please try again.");
    }
  },

  adminRegistration: async (data: RegisterData) => {
    try {
      const response = await axios.post(`${API_URL}/register`, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message ||
            error.response?.data?.error ||
            "Registration failed. Please try again."
        );
      }
      throw new Error("Registration failed. Please try again.");
    }
  },

  login: async (data: LoginData): Promise<LoginResponse> => {
    try {
      const response = await axios.post(`${API_URL}/login`, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message ||
            error.response?.data?.error ||
            "Login failed. Please check your credentials and try again."
        );
      }
      throw new Error("Login failed. Please try again.");
    }
  },

  logout: async () => {
    try {
      await axios.post(`${API_URL}/logout`);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  },

  refreshToken: async () => {
    const response = await axios.post(`${API_URL}/refresh-token`);
    return response.data.token;
  },
};
