import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router";
import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoutes";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminRegistration from "./pages/admin/AdminRegistration";
import MasterAdminDashboard from "./pages/dashboard/MasterAdminDashBoard";
import StaffDashboard from "./pages/dashboard/StaffDashboard.tsx";
import StudentDashboard from "./pages/dashboard/StudentDashboard";
import Unauthorized from "./pages/Unauthorized.tsx";

const App = () => (
  <TooltipProvider>
    <Sonner />
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute allowedRoles={["MasterAdmin"]} />}>
            <Route path="/master-admin/*" element={<MasterAdminDashboard />} />
          </Route>

          <Route
            element={
              <ProtectedRoute allowedRoles={["HOD", "AssistantTeacher"]} />
            }
          >
            <Route path="/staff/*" element={<StaffDashboard />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["Student"]} />}>
            <Route path="/student/*" element={<StudentDashboard />} />
          </Route>

          <Route path="/admin/register" element={<AdminRegistration />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
