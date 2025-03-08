import { useState } from "react";
import { Link } from "react-router";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      toast.error("Please fill in all fields", {
        description: "Error",
        style: {
          backgroundColor: "#ffebee",
          color: "#c62828",
          border: "1px solid #c62828",
        },
      });
      return;
    }

    // Show success toast (replace with actual login logic)
    const toastId = toast.loading("Processing your request...", {
      style: {
        backgroundColor: "#fff3e0",
        color: "#ef6c00",
        border: "1px solid #ef6c00",
      },
    });

    // Simulate an async operation (e.g., API call)
    setTimeout(() => {
      // Dismiss the loading toast
      toast.dismiss(toastId);

      // Show a success toast
      toast.success("Request completed!", {
        description: "Success",
        style: {
          backgroundColor: "#e8f5e9",
          color: "#2e7d32",
          border: "1px solid #2e7d32",
        },
      });
    }, 3000);
    console.log("Login attempt:", { email, password });
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

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <input
                    id="remember-me"
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
                  to="#"
                  className="text-teal-600 hover:text-teal-700 font-medium"
                >
                  Forgot password?
                </Link>
              </div>

              <motion.button
                type="submit"
                className="w-full bg-teal-600 text-white py-2 px-4 rounded-md font-medium shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Sign in
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
