import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      toast.error("Please fill in all fields", {
        description: "Error",
        style: {
          backgroundColor: "#ffebee",
          color: "#c62828",
          border: "1px solid #c62828",
        },
      });
      setIsLoading(false);
      return;
    }

    const toastId = toast.loading("Logging in...", {
      style: {
        backgroundColor: "#fff3e0",
        color: "#ef6c00",
        border: "1px solid #ef6c00",
      },
      duration: 300,
    });

    try {
      await login(email, password);

      toast.success("Login successful!", {
        description: "Redirecting to dashboard...",
        style: {
          backgroundColor: "#e8f5e9",
          color: "#2e7d32",
          border: "1px solid #2e7d32",
        },
      });

      // Redirect based on role
      switch (user?.role) {
        case "MasterAdmin":
          navigate("/master-admin");
          break;
        case "HOD":
        case "AssistantTeacher":
          navigate("/staff");
          break;
        case "Student":
          navigate("/student");
          break;
        default:
          navigate("/");
      }
    } catch (error) {
      toast.dismiss(toastId);

      const errorMessage =
        error instanceof Error ? error.message : "Invalid credentials";

      toast.error("Login failed", {
        description: errorMessage,
        style: {
          backgroundColor: "#ffebee",
          color: "#c62828",
          border: "1px solid #c62828",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 pt-24 pb-12">
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
                Login to Your Account
              </h2>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                    placeholder="your@email.com"
                    required
                    autoComplete="username"
                  />
                </div>
              </div>

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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                    placeholder="••••••••"
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-gray-700"
                  >
                    Remember me
                  </label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-teal-600 hover:text-teal-700 font-medium"
                >
                  Forgot password?
                </Link>
              </div>

              <motion.button
                type="submit"
                className="w-full bg-teal-600 text-white py-2 px-4 rounded-md font-medium shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </motion.button>
            </motion.form>

            <motion.div
              className="mt-6 text-center text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-teal-600 hover:text-teal-700 font-medium"
                >
                  Register
                </Link>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
