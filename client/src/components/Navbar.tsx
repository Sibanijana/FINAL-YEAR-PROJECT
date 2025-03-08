import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Track scroll position to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Animation variants for the elements
  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const navLinks = [
    { name: "About", path: "/about" },
    { name: "Careers", path: "/careers" },
    { name: "History", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Projects", path: "#" },
    { name: "Blog", path: "#" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-white"
        }`}
      >
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="md:flex md:items-center md:gap-12">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link className="block text-teal-600" to="/">
                  <span className="sr-only">Home</span>
                  <svg
                    className="h-8"
                    viewBox="0 0 28 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                      fill="currentColor"
                    />
                  </svg>
                </Link>
              </motion.div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <nav aria-label="Global">
                <ul className="flex items-center gap-6 text-md font-medium">
                  {navLinks.map((link, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: index * 0.05,
                        duration: 0.3,
                        ease: "easeOut",
                      }}
                    >
                      <Link
                        className="text-gray-500 transition-colors duration-300 hover:text-teal-600 nav-link"
                        to={link.path}
                      >
                        {link.name}
                      </Link>
                    </motion.li>
                  ))}
                  <div className="ml-6 space-x-4">
                    <motion.span
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.4,
                        type: "spring",
                        stiffness: 100,
                      }}
                    >
                      <Link
                        className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow-md transition-all duration-300 hover:bg-teal-700 hover:shadow-lg"
                        to="/login"
                      >
                        Login
                      </Link>
                    </motion.span>
                    <motion.span
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.5,
                        type: "spring",
                        stiffness: 100,
                      }}
                    >
                      <Link
                        className="rounded-md bg-slate-100 px-5 py-2.5 text-sm font-medium text-teal-600 shadow-sm transition-all duration-300 hover:bg-teal-50 hover:shadow-md"
                        to="/register"
                      >
                        Register
                      </Link>
                    </motion.span>
                  </div>
                </ul>
              </nav>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="block md:hidden">
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="rounded-full bg-gray-100 p-2 text-gray-600 transition-all duration-150 hover:bg-gray-200"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                <motion.div
                  animate={isMenuOpen ? "open" : "closed"}
                  variants={{
                    open: { rotate: 90 },
                    closed: { rotate: 0 },
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={
                        isMenuOpen
                          ? "M6 18L18 6M6 6l12 12"
                          : "M4 6h16M4 12h16M4 18h16"
                      }
                    />
                  </svg>
                </motion.div>
              </motion.button>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.nav
                className="md:hidden overflow-hidden"
                initial="closed"
                animate="open"
                exit="closed"
                variants={menuVariants}
              >
                <motion.ul className="space-y-2 mt-4 mb-6 text-sm text-gray-500">
                  {navLinks.map((link, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: index * 0.05,
                        duration: 0.3,
                      }}
                    >
                      <Link
                        to={link.path}
                        className="block px-4 py-3 rounded-md transition-all duration-300 hover:bg-gray-100 hover:text-teal-600"
                      >
                        {link.name}
                      </Link>
                    </motion.li>
                  ))}
                  <motion.li
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                    className="pt-4"
                  >
                    <div className="flex flex-col gap-3 px-4">
                      <Link
                        className="w-full rounded-md bg-teal-600 px-5 py-2.5 text-center text-sm font-medium text-white shadow transition-all duration-300 hover:bg-teal-700"
                        to="/login"
                      >
                        Login
                      </Link>
                      <Link
                        className="w-full rounded-md bg-slate-100 px-5 py-2.5 text-center text-sm font-medium text-teal-600 shadow-sm transition-all duration-300 hover:bg-teal-50"
                        to="/register"
                      >
                        Register
                      </Link>
                    </div>
                  </motion.li>
                </motion.ul>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar (visible on mobile only) */}
      <div className="block md:hidden">
        <motion.nav
          className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 mobile-tab-bar py-2"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          <ul className="flex justify-around items-center px-2">
            {[
              { name: "Home", path: "/", icon: "🏠" },
              { name: "About", path: "/about", icon: "ℹ️" },
              { name: "Services", path: "/services", icon: "🛠️" },
              { name: "Blog", path: "#", icon: "📝" },
              { name: "Account", path: "/login", icon: "👤" },
            ].map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <motion.li key={index} whileTap={{ scale: 0.9 }}>
                  <Link
                    to={item.path}
                    className={`flex flex-col items-center justify-center p-2 ${
                      isActive ? "text-teal-600" : "text-gray-500"
                    }`}
                  >
                    <motion.div whileHover={{ y: -2 }} className="text-xl">
                      {item.icon}
                    </motion.div>
                    <motion.span
                      className={`text-xs font-medium mt-1 ${
                        isActive ? "opacity-100" : "opacity-70"
                      }`}
                      animate={{ scale: isActive ? 1.05 : 1 }}
                    >
                      {item.name}
                    </motion.span>
                    {isActive && (
                      <motion.div
                        className="h-1 w-6 bg-teal-600 rounded-full mt-1"
                        layoutId="activeTab"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        </motion.nav>
      </div>
      {/* Add padding at the bottom to account for the mobile nav bar */}
      <div className="md:hidden pb-16"></div>
    </>
  );
};

export default Navbar;
