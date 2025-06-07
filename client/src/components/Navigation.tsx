
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, UserCheck, GraduationCap, ShieldX, Calendar } from "lucide-react";
import UserProfile from "@/components/UserProfile";
import { useAuthStore } from "@/stores/authStore";

const Navigation = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuthStore();

  const navItems = [
    { path: "/admin", label: "Admin Dashboard", icon: Users, color: "text-blue-600" },
    { path: "/staff", label: "Staff Dashboard", icon: UserCheck, color: "text-emerald-600" },
    { path: "/student", label: "Student Dashboard", icon: GraduationCap, color: "text-purple-600" },
    { path: "/unauthorized", label: "Unauthorized", icon: ShieldX, color: "text-red-600" },
  ];

  return (
    <Card className="p-6 border-0 bg-white/60 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
            <Calendar className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Routine Management</h2>
            <p className="text-sm text-slate-600">Academic Schedule System</p>
          </div>
        </div>
        
        {isAuthenticated && (
          <div className="flex items-center">
            <UserProfile />
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {navItems.map((item) => (
          <Link key={item.path} to={item.path}>
            <Button 
              variant={location.pathname === item.path ? "default" : "outline"}
              className={`w-full h-20 flex-col gap-2 hover:scale-105 transition-all duration-200 ${
                location.pathname === item.path 
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" 
                  : "hover:border-slate-300"
              }`}
            >
              <item.icon className={`h-6 w-6 ${location.pathname === item.path ? "text-white" : item.color}`} />
              <span className={`text-sm font-medium ${location.pathname === item.path ? "text-white" : "text-slate-700"}`}>
                {item.label}
              </span>
            </Button>
          </Link>
        ))}
      </div>
    </Card>
  );
};

export default Navigation;
