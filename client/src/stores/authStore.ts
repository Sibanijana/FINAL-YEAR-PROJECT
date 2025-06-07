
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { apiService, type BackendUser } from '@/services/api';

export type UserRole = 'MasterAdmin' | 'HOD' | 'AssistantTeacher' | 'Student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  username?: string;
  department?: string;
  collegeId?: string;
  mobileNo?: string;
  group?: string;
  semester?: string;
  departmentId?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  setUser: (user: User) => void;
  getCurrentUser: () => Promise<void>;
  hasRole: (role: UserRole) => boolean;
  hasAnyRole: (roles: UserRole[]) => boolean;
  canAccess: (requiredRole: UserRole) => boolean;
}

const roleHierarchy: Record<UserRole, number> = {
  MasterAdmin: 4,
  HOD: 3,
  AssistantTeacher: 2,
  Student: 1,
};

// Helper function to convert backend user to frontend user
const convertBackendUser = (backendUser: BackendUser): User => ({
  id: backendUser.id,
  name: backendUser.username,
  email: backendUser.email,
  role: backendUser.role,
  avatar: backendUser.avatar,
  username: backendUser.username,
  department: backendUser.department,
  collegeId: backendUser.collegeId,
  mobileNo: backendUser.mobileNo,
  group: backendUser.group,
  semester: backendUser.semester,
  departmentId: backendUser.departmentId,
});

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        
        try {
          const response = await apiService.login({ email, password });
          
          if (response.user) {
            const user = convertBackendUser(response.user);
            set({ user, isAuthenticated: true, isLoading: false });
            return true;
          }
          
          set({ isLoading: false });
          return false;
        } catch (error) {
          console.error('Login error:', error);
          set({ isLoading: false });
          return false;
        }
      },

      logout: async () => {
        try {
          await apiService.logout();
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          set({ user: null, isAuthenticated: false });
        }
      },

      setUser: (user: User) => {
        set({ user, isAuthenticated: true });
      },

      getCurrentUser: async () => {
        try {
          const response = await apiService.getCurrentUser();
          
          if (response.user) {
            const user = convertBackendUser(response.user);
            set({ user, isAuthenticated: true });
          }
        } catch (error) {
          console.error('Get current user error:', error);
          set({ user: null, isAuthenticated: false });
        }
      },

      hasRole: (role: UserRole) => {
        const { user } = get();
        return user?.role === role;
      },

      hasAnyRole: (roles: UserRole[]) => {
        const { user } = get();
        return user ? roles.includes(user.role) : false;
      },

      canAccess: (requiredRole: UserRole) => {
        const { user } = get();
        if (!user) return false;
        return roleHierarchy[user.role] >= roleHierarchy[requiredRole];
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
