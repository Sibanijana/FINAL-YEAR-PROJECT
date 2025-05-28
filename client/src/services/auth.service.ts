import axios from "axios";

const API_URL = "http://localhost:8080/api/auth"; // Adjust to your backend URL

interface RegisterData {
  username: string;
  email: string;
  mobileNo: string;
  collegeId: string;
  role?: string; // Optional for student registration
  password: string;
  department: string;
}

interface LoginData {
  email: string; // or email, depending on your backend
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    role: string;
    department?: string; // Optional if your backend provides this
  };
}

export const registerStudent = async (data: RegisterData) => {
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
};

export const adminRegistration = async (data: RegisterData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      ...data,
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
};

export const loginUser = async (data: LoginData): Promise<LoginResponse> => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email: data.email, // or email if your backend expects email
      password: data.password,
    });
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
};
