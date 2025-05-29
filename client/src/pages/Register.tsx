import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  PhoneCall,
  IdCard,
  HomeIcon,
} from "lucide-react";
import { toast } from "sonner";
import { authService } from "@/services/auth.service";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    role: "",
    collegeId: "",
    password: "",
    confirmPassword: "",
    department: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validation
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

    const toastId = toast.loading("Creating your account...");

    try {
      await authService.registerStudent({
        username: formData.name,
        email: formData.email,
        mobileNo: formData.mobileNo,
        collegeId: formData.collegeId,
        password: formData.password,
        department: formData.department,
      });

      toast.dismiss(toastId);
      toast.success("Account created successfully!");
      navigate("/login");
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 pt-24 pb-12 -mt-10 md:mt-0">
        <motion.div
          className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                Create Your Account
              </h2>
            </motion.div>

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
                  className="text-sm font-medium text-gray-700 block"
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
                  className="text-sm font-medium text-gray-700 block"
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
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              {/* Mobile Number Field */}
              <div className="space-y-2">
                <label
                  htmlFor="mobileNo"
                  className="text-sm font-medium text-gray-700 block"
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
                  className="text-sm font-medium text-gray-700 block"
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
                    placeholder="28100121008"
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

              {/* Password Field */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700 block"
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
                  className="text-sm font-medium text-gray-700 block"
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

              {/* Terms Checkbox */}
              <div className="flex items-center text-sm">
                <input
                  id="terms"
                  type="checkbox"
                  className="h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                  required
                />
                <label htmlFor="terms" className="ml-2 block text-gray-700">
                  I agree to the{" "}
                  <Link
                    to="#"
                    className="text-teal-600 hover:text-teal-700 font-medium"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="#"
                    className="text-teal-600 hover:text-teal-700 font-medium"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="w-full bg-teal-600 text-white py-2 px-4 rounded-md font-medium shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </motion.button>
            </motion.form>

            <motion.div
              className="mt-6 text-center text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-teal-600 hover:text-teal-700 font-medium"
                >
                  Login
                </Link>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
