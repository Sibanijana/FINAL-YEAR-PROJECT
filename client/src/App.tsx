
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import StaffDashboard from "./pages/StaffDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { isAuthenticated, user } = useAuthStore();

  // Function to get default redirect based on user role
  const getDefaultRedirect = () => {
    if (!user) return '/admin';
    
    switch (user.role) {
      case 'MasterAdmin':
      case 'HOD':
        return '/admin';
      case 'AssistantTeacher':
        return '/staff';
      case 'Student':
        return '/student';
      default:
        return '/admin';
    }
  };

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          isAuthenticated ? 
            <Navigate to={getDefaultRedirect()} replace /> : 
            <Index />
        } 
      />
      <Route 
        path="/login" 
        element={
          !isAuthenticated ? 
            <Login /> : 
            <Navigate to={getDefaultRedirect()} replace />
        } 
      />
      
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute requiredRole="HOD">
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/staff" 
        element={
          <ProtectedRoute allowedRoles={["MasterAdmin", "HOD", "AssistantTeacher"]}>
            <StaffDashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/student" 
        element={
          <ProtectedRoute allowedRoles={["MasterAdmin", "HOD", "AssistantTeacher", "Student"]}>
            <StudentDashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
