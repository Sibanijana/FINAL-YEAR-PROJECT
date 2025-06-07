/* eslint-disable @typescript-eslint/no-explicit-any */

const API_BASE_URL = "http://localhost:8080";

// API response types
export interface ApiResponse<T = any> {
  message: string;
  user?: T;
  token?: string;
  error?: string;
}

export interface BackendUser {
  id: string;
  username: string;
  email: string;
  role: "MasterAdmin" | "HOD" | "AssistantTeacher" | "Student";
  department?: string;
  collegeId?: string;
  mobileNo?: string;
  avatar?: string;
  group?: string;
  semester?: string;
  departmentId?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  password: string;
  email: string;
  mobileNo: string;
  collegeId: string;
  role: string;
  department?: string;
  departmentId?: string;
  group?: string;
  semester?: string;
}

class ApiService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem("authToken");
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  }

  // Auth endpoints
  async login(
    credentials: LoginCredentials
  ): Promise<ApiResponse<BackendUser>> {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      credentials: "include",
      body: JSON.stringify(credentials),
    });

    const result = await this.handleResponse<BackendUser>(response);

    // Store token if provided
    if (result.token) {
      localStorage.setItem("authToken", result.token);
    }

    return result;
  }

  async logout(): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      credentials: "include",
    });

    // Clear token regardless of response
    localStorage.removeItem("authToken");

    return this.handleResponse(response);
  }

  async getCurrentUser(): Promise<ApiResponse<BackendUser>> {
    const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
      method: "GET",
      headers: this.getAuthHeaders(),
      credentials: "include",
    });

    return this.handleResponse<BackendUser>(response);
  }

  async register(userData: RegisterData): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/api/auth/admin/register`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      credentials: "include",
      body: JSON.stringify(userData),
    });

    return this.handleResponse(response);
  }

  async registerStudent(studentData: RegisterData): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/api/auth/register/student`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      credentials: "include",
      body: JSON.stringify(studentData),
    });

    return this.handleResponse(response);
  }

  async updateUser(
    id: string,
    userData: Partial<BackendUser>
  ): Promise<ApiResponse<BackendUser>> {
    const response = await fetch(`${API_BASE_URL}/api/auth/user/${id}`, {
      method: "PATCH",
      headers: this.getAuthHeaders(),
      credentials: "include",
      body: JSON.stringify(userData),
    });

    return this.handleResponse<BackendUser>(response);
  }

  async deleteUser(id: string): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/api/auth/user/${id}`, {
      method: "DELETE",
      headers: this.getAuthHeaders(),
      credentials: "include",
    });

    return this.handleResponse(response);
  }

  // Routine endpoints
  async getRoutines(): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/api/routine`, {
      method: "GET",
      headers: this.getAuthHeaders(),
      credentials: "include",
    });

    return this.handleResponse(response);
  }

  async createRoutine(routineData: any): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/api/routine`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      credentials: "include",
      body: JSON.stringify(routineData),
    });

    return this.handleResponse(response);
  }

  async updateRoutine(id: string, routineData: any): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/api/routine/${id}`, {
      method: "PUT",
      headers: this.getAuthHeaders(),
      credentials: "include",
      body: JSON.stringify(routineData),
    });

    return this.handleResponse(response);
  }

  async deleteRoutine(id: string): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/api/routine/${id}`, {
      method: "DELETE",
      headers: this.getAuthHeaders(),
      credentials: "include",
    });

    return this.handleResponse(response);
  }
}

export const apiService = new ApiService();
