// src/components/ProtectedRoute.tsx
import { useAuthStore } from "@/store/authStore";
import { Navigate, Outlet } from "react-router";

interface ProtectedRouteProps {
  allowedRoles: ("MasterAdmin" | "HOD" | "AssistantTeacher" | "Student")[];
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { user, isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return <div>Loading...</div>; // Or your loading component
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  return allowedRoles.includes(user.role) ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" replace />
  );
};
