/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/admin/Register.tsx
import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  PhoneCall,
  IdCard,
  Shield,
  HomeIcon,
} from "lucide-react";
import { toast } from "sonner";
import { adminRegistration } from "../../services/auth.service";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AdminRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    role: "", // Default to MasterAdmin
    collegeId: "",
    department: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!Object.values(formData).every((field) => field.trim())) {
      toast.error("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      setIsLoading(false);
      return;
    }

    const toastId = toast.loading("Creating admin account...");

    try {
      await adminRegistration({
        username: formData.name,
        email: formData.email,
        mobileNo: formData.mobileNo,
        collegeId: formData.collegeId,
        password: formData.password,
        role: formData.role,
        department: formData.department,
      });

      toast.dismiss(toastId);
      toast.success("Admin account created successfully!");
      navigate("/admin/dashboard");
    } catch (error: any) {
      toast.dismiss(toastId);
      toast.error(error.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-6">
            <div className="text-center mb-6">
              <Shield className="mx-auto h-12 w-12 text-teal-600" />
              <h2 className="mt-2 text-2xl font-bold text-gray-800">
                Admin Registration
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Register a new admin account
              </p>
            </div>

            <motion.form
              onSubmit={handleSubmit}
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {/* Name Field */}
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                    placeholder="admin@college.edu"
                    required
                  />
                </div>
              </div>

              {/* Mobile Number Field */}
              <div className="space-y-2">
                <label
                  htmlFor="mobileNo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mobile Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <PhoneCall size={18} />
                  </div>
                  <input
                    type="text"
                    id="mobileNo"
                    value={formData.mobileNo}
                    onChange={handleChange}
                    className="block w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                    placeholder="1234567890"
                    required
                  />
                </div>
              </div>

              {/* College ID Field */}
              <div className="space-y-2">
                <label
                  htmlFor="collegeId"
                  className="block text-sm font-medium text-gray-700"
                >
                  College ID
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <IdCard size={18} />
                  </div>
                  <input
                    type="text"
                    id="collegeId"
                    value={formData.collegeId}
                    onChange={handleChange}
                    className="block w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                    placeholder="ADM001"
                    required
                  />
                </div>
              </div>

              {/* Department Field */}
              <div className="space-y-2">
                <label
                  htmlFor="department"
                  className="text-sm font-medium text-gray-700 block"
                >
                  Department
                </label>
                {/* shadcn/ui Select with HomeIcon inside */}
                <Select
                  value={formData.department}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      department: value,
                    }))
                  }
                  required
                >
                  <SelectTrigger className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 flex items-center">
                    <HomeIcon size={18} className="mr-2 text-gray-400" />
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CSE">CSE</SelectItem>
                    <SelectItem value="EE">EE</SelectItem>
                    <SelectItem value="ECE">ECE</SelectItem>
                    <SelectItem value="CE">CE</SelectItem>
                    <SelectItem value="ME">ME</SelectItem>
                    <SelectItem value="CSBS">CSBS</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Role Field */}
              <div className="space-y-2">
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700"
                >
                  Role
                </label>
                <select
                  id="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                  required
                >
                  <option value="MasterAdmin">Master Admin</option>
                  <option value="DepartmentAdmin">Department Admin</option>
                  <option value="FacultyAdmin">Faculty Admin</option>
                </select>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="block w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <motion.button
                type="submit"
                className="w-full bg-teal-600 text-white py-2 px-4 rounded-md font-medium shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
              >
                {isLoading
                  ? "Creating Admin Account..."
                  : "Create Admin Account"}
              </motion.button>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminRegistration;
