import {
  Calendar,
  Users,
  BookOpen,
  BarChart3,
  Clock,
  Shield,
  ArrowRight,
  Check,
  Star,
  Menu,
  X,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import UserProfile from "@/components/UserProfile";

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuthStore();

  const features = [
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description:
        "Intelligent routine management with conflict detection and optimization",
      color: "text-blue-600",
    },
    {
      icon: Users,
      title: "User Management",
      description:
        "Comprehensive admin, staff, and student account management system",
      color: "text-emerald-600",
    },
    {
      icon: BookOpen,
      title: "Course Integration",
      description:
        "Seamless integration with courses, subjects, and academic programs",
      color: "text-purple-600",
    },
    {
      icon: BarChart3,
      title: "Analytics & Reports",
      description:
        "Detailed insights and analytics for academic performance tracking",
      color: "text-orange-600",
    },
    {
      icon: Clock,
      title: "Real-time Updates",
      description:
        "Instant notifications and real-time schedule updates across all users",
      color: "text-teal-600",
    },
    {
      icon: Shield,
      title: "Secure Access",
      description:
        "Role-based access control ensuring data security and privacy",
      color: "text-red-600",
    },
  ];

  const benefits = [
    "Reduce scheduling conflicts by 90%",
    "Save 15+ hours per week on administrative tasks",
    "Improve student engagement and attendance",
    "Streamline communication between all stakeholders",
    "Generate comprehensive analytics and reports",
    "Mobile-responsive design for access anywhere",
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "Academic Director",
      institution: "Westfield University",
      content:
        "This system has revolutionized how we manage our academic schedules. The time savings are incredible!",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "IT Administrator",
      institution: "Lincoln High School",
      content:
        "Easy to implement and even easier to use. Our staff productivity has increased significantly.",
      rating: 5,
    },
    {
      name: "Prof. Emily Davis",
      role: "Department Head",
      institution: "Cambridge College",
      content:
        "The analytics features provide insights we never had before. Highly recommended!",
      rating: 5,
    },
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "$29",
      period: "/month",
      description: "Perfect for small institutions",
      features: [
        "Up to 100 users",
        "Basic scheduling",
        "Email support",
        "Mobile app access",
        "Basic reports",
      ],
      popular: false,
    },
    {
      name: "Professional",
      price: "$79",
      period: "/month",
      description: "Ideal for growing institutions",
      features: [
        "Up to 500 users",
        "Advanced scheduling",
        "Priority support",
        "Mobile app access",
        "Advanced analytics",
        "Custom integrations",
        "Role-based permissions",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large institutions",
      features: [
        "Unlimited users",
        "All features included",
        "24/7 dedicated support",
        "Custom development",
        "On-premise deployment",
        "Training & onboarding",
        "SLA guarantee",
      ],
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Navigation */}
      <nav className="relative bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                RoutineHub
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#features"
                className="text-slate-700 hover:text-blue-600 transition-colors"
              >
                Features
              </a>
              <a
                href="#benefits"
                className="text-slate-700 hover:text-blue-600 transition-colors"
              >
                Benefits
              </a>
              <a
                href="#testimonials"
                className="text-slate-700 hover:text-blue-600 transition-colors"
              >
                Testimonials
              </a>
              <a
                href="#pricing"
                className="text-slate-700 hover:text-blue-600 transition-colors"
              >
                Pricing
              </a>

              {isAuthenticated ? (
                <UserProfile />
              ) : (
                <Link to="/login">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Sign In
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-200">
              <div className="flex flex-col gap-4">
                <a
                  href="#features"
                  className="text-slate-700 hover:text-blue-600 transition-colors"
                >
                  Features
                </a>
                <a
                  href="#benefits"
                  className="text-slate-700 hover:text-blue-600 transition-colors"
                >
                  Benefits
                </a>
                <a
                  href="#testimonials"
                  className="text-slate-700 hover:text-blue-600 transition-colors"
                >
                  Testimonials
                </a>
                <a
                  href="#pricing"
                  className="text-slate-700 hover:text-blue-600 transition-colors"
                >
                  Pricing
                </a>

                {isAuthenticated ? (
                  <div className="w-fit">
                    <UserProfile />
                  </div>
                ) : (
                  <Link to="/login" className="w-fit">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      Sign In
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
            Transform Your
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Academic{" "}
            </span>
            Scheduling
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto mb-10 leading-relaxed">
            The most powerful routine management platform for educational
            institutions. Streamline schedules, boost productivity, and enhance
            collaboration.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link to="/login">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4">
              Watch Demo
            </Button>
          </div>

          {/* Hero Image/Dashboard Preview */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-slate-200">
              <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Calendar className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-500 text-lg">Dashboard Preview</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Powerful Features
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Everything you need to manage academic routines efficiently and
              effectively
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <CardHeader>
                  <div
                    className={`w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center mb-4 ${feature.color}`}
                  >
                    <feature.icon className="h-7 w-7" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Why Choose RoutineHub?
              </h2>
              <p className="text-xl text-slate-600 mb-8">
                Join thousands of educational institutions that have transformed
                their scheduling process.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-slate-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                <BarChart3 className="h-24 w-24 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              What Our Users Say
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Trusted by educational institutions worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-0 bg-white/80 backdrop-blur-sm"
              >
                <CardHeader>
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <CardDescription className="text-slate-700 leading-relaxed">
                    "{testimonial.content}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <p className="font-semibold text-slate-900">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-slate-600">{testimonial.role}</p>
                    <p className="text-sm text-blue-600">
                      {testimonial.institution}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Choose the perfect plan for your institution
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`border-0 bg-white/80 backdrop-blur-sm relative ${
                  plan.popular ? "ring-2 ring-blue-600 scale-105" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-slate-900">
                    {plan.name}
                  </CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-slate-900">
                      {plan.price}
                    </span>
                    <span className="text-slate-600">{plan.period}</span>
                  </div>
                  <CardDescription className="text-slate-600 mt-2">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-3"
                      >
                        <Check className="h-5 w-5 text-green-600" />
                        <span className="text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        : "variant-outline"
                    }`}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Institution?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of institutions already using RoutineHub to
            streamline their operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-4"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-4 text-gray-400 border-white hover:bg-gray-50 hover:text-blue-600"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold">RoutineHub</span>
              </div>
              <p className="text-slate-400 mb-4">
                The most powerful routine management platform for educational
                institutions.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a
                    href="#features"
                    className="hover:text-white transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="hover:text-white transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Integrations
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Status
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
            <p>&copy; 2024 RoutineHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
