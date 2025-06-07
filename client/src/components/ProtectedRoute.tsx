
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore, UserRole } from '@/stores/authStore';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: UserRole;
  allowedRoles?: UserRole[];
  redirectTo?: string;
}

const ProtectedRoute = ({ 
  children, 
  requiredRole, 
  allowedRoles, 
  redirectTo = '/unauthorized' 
}: ProtectedRouteProps) => {
  const { isAuthenticated, hasRole, hasAnyRole, canAccess } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check specific role requirement
  if (requiredRole && !canAccess(requiredRole)) {
    return <Navigate to={redirectTo} replace />;
  }

  // Check if user has any of the allowed roles
  if (allowedRoles && !hasAnyRole(allowedRoles)) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
