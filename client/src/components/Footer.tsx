import { Link } from "react-router";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="inline-block mb-6">
              <svg
                className="h-8"
                viewBox="0 0 28 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547Z"
                  fill="currentColor"
                />
              </svg>
            </Link>
            <p className="text-gray-400 mb-4">
              Streamline your daily routines and boost your productivity with
              our comprehensive routine management system.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-teal-400 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-teal-400 transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-teal-400 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-teal-400 transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-teal-400 transition-colors"
              >
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-teal-400">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-teal-400">
              Features
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Daily Planning
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Progress Tracking
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Habit Building
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Goal Setting
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Time Management
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Calendar Integration
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-teal-400">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-3 h-5 w-5 text-teal-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">
                  123 Productivity Street, Organization City, PL 12345
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 h-5 w-5 text-teal-400 flex-shrink-0" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 h-5 w-5 text-teal-400 flex-shrink-0" />
                <span className="text-gray-400">support@routinesystem.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar with copyright */}
        <div className="pt-8 mt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} Routine Management System. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
