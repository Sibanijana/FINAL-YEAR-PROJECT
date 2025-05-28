// src/components/ProtectedRoute.tsx
import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router";

interface ProtectedRouteProps {
  allowedRoles: ("MasterAdmin" | "HOD" | "AssistantTeacher" | "Student")[];
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return allowedRoles.includes(user.role) ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" replace />
  );
};
