import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, LogInIcon } from "lucide-react";
import LogoTicker from "../components/LogoTicker";
import ReviewsMarquee from "../components/ReviewsMarquee";
import Footer from "../components/Footer";
import { Link } from "react-router";

const Index = () => {
  const features = [
    {
      title: "Daily Planning",
      description:
        "Organize your tasks and schedule with our intuitive daily planner",
      icon: <CheckCircle2 className="h-6 w-6 text-teal-500" />,
    },
    {
      title: "Progress Tracking",
      description:
        "Monitor your productivity and achievements with detailed analytics",
      icon: <CheckCircle2 className="h-6 w-6 text-teal-500" />,
    },
    {
      title: "Habit Building",
      description: "Develop and maintain positive habits with streak tracking",
      icon: <CheckCircle2 className="h-6 w-6 text-teal-500" />,
    },
    {
      title: "Goal Setting",
      description:
        "Set achievable goals and break them down into manageable steps",
      icon: <CheckCircle2 className="h-6 w-6 text-teal-500" />,
    },
  ];
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <motion.div
        className="container mx-auto px-4 pt-24 pb-12 md:pt-32 md:pb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Routine Management System
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <p className="text-xl text-gray-600 mb-8">
                Streamline your daily routines and boost your productivity
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/register"
                  className="inline-flex px-6 py-3 bg-teal-600 text-white font-medium rounded-full shadow-md hover:bg-teal-700 transition-all duration-300 justify-center items-center mx-auto"
                >
                  Get Started <ArrowRight />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/login"
                  className="inline-flex px-8 py-3 bg-white text-teal-600 font-medium rounded-md shadow-md hover:bg-gray-100 transition-all duration-300"
                >
                  Login <LogInIcon className="ml-2" />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      {/* Features Section */}
      <motion.section
        className="py-12 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center mb-12 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Powerful Features to Organize Your Life
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Link
              to="/register"
              className="inline-flex items-center text-teal-600 font-medium hover:text-teal-700 transition-colors"
            >
              Explore all features
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Logo Ticker Section */}
      <section className="py-4 md:py-10 bg-gray-100/60">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold text-center text-muted-foreground mb-8">
            Trusted by innovative companies
          </h2>
          <LogoTicker />
        </div>
      </section>

      {/* Reviews Marquee Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center mb-12 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            What Our Users Say
          </motion.h2>
          <ReviewsMarquee />
        </div>
      </section>

      {/* CTA Section before Footer */}
      <motion.section
        className="py-16 bg-teal-600 text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Ready to Transform Your Daily Routine?
          </motion.h2>
          <motion.p
            className="text-xl mb-8 max-w-3xl mx-auto opacity-90"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            Join thousands of users who have improved their productivity and
            achieved their goals.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Link
              to="/register"
              className="inline-block px-8 py-3 bg-white text-teal-600 font-medium rounded-md shadow-md hover:bg-gray-50 transition-all duration-300"
            >
              Get Started for Free
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
