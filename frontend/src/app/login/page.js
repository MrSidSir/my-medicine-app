"use client";

import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiEye, FiEyeOff, FiMail, FiLock, FiLoader } from "react-icons/fi";
import { GoogleLogin } from "@react-oauth/google";
import { AuthContext } from "../../context/AuthContext";
import { LanguageContext } from "../../context/LanguageProvider";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const LoginPage = () => {
  const router = useRouter();
  const { login, currentUser, loading } = useContext(AuthContext);
  const { language } = useContext(LanguageContext);

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      router.push('/');
    }
  }, [currentUser, router]);

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  // Translations
  const translations = {
    en: {
      title: "Sign In to MediStore",
      subtitle: "Access your medical prescriptions and orders",
      emailLabel: "Email Address",
      emailPlaceholder: "Enter your email",
      passwordLabel: "Password",
      passwordPlaceholder: "Enter your password",
      loginButton: "Sign In",
      loginWith: "Or sign in with",
      noAccount: "Don't have an account?",
      signUp: "Sign up here",
      forgotPassword: "Forgot your password?",
      resetPassword: "Reset it here",
      rememberMe: "Remember me",
      errors: {
        required: "This field is required",
        email: "Please enter a valid email address",
        password: "Password must be at least 6 characters",
        server: "Login failed. Please check your credentials."
      }
    },
    hi: {
      title: "मेडीस्टोर में साइन इन करें",
      subtitle: "अपने मेडिकल प्रिस्क्रिप्शन और ऑर्डर तक पहुंचें",
      emailLabel: "ईमेल पता",
      emailPlaceholder: "अपना ईमेल दर्ज करें",
      passwordLabel: "पासवर्ड",
      passwordPlaceholder: "अपना पासवर्ड दर्ज करें",
      loginButton: "साइन इन करें",
      loginWith: "या इससे साइन इन करें",
      noAccount: "खाता नहीं है?",
      signUp: "यहाँ साइन अप करें",
      forgotPassword: "पासवर्ड भूल गए?",
      resetPassword: "यहाँ रीसेट करें",
      rememberMe: "मुझे याद रखें",
      errors: {
        required: "यह फील्ड आवश्यक है",
        email: "कृपया एक वैध ईमेल पता दर्ज करें",
        password: "पासवर्ड कम से कम 6 अक्षर का होना चाहिए",
        server: "लॉगिन असफल। कृपया अपनी जानकारी जांचें।"
      }
    },
    ur: {
      title: "میڈی اسٹور میں سائن ان کریں",
      subtitle: "اپنے طبی نسخوں اور آرڈرز تک رسائی حاصل کریں",
      emailLabel: "ای میل ایڈریس",
      emailPlaceholder: "اپنا ای میل درج کریں",
      passwordLabel: "پاس ورڈ",
      passwordPlaceholder: "اپنا پاس ورڈ درج کریں",
      loginButton: "سائن ان کریں",
      loginWith: "یا اس کے ساتھ سائن ان کریں",
      noAccount: "اکاؤنٹ نہیں ہے؟",
      signUp: "یہاں سائن اپ کریں",
      forgotPassword: "پاس ورڈ بھول گئے؟",
      resetPassword: "یہاں ری سیٹ کریں",
      rememberMe: "مجھے یاد رکھیں",
      errors: {
        required: "یہ فیلڈ ضروری ہے",
        email: "برائے کرم درست ای میل ایڈریس درج کریں",
        password: "پاس ورڈ کم از کم 6 حروف کا ہونا چاہیے",
        server: "لاگ ان ناکام۔ برائے کرم اپنی معلومات چیک کریں۔"
      }
    }
  };

  const t = translations[language] || translations.en;

  // Validation
  const validateForm = () => {
    const errors = {};

    if (!formData.email.trim()) {
      errors.email = t.errors.required;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = t.errors.email;
    }

    if (!formData.password) {
      errors.password = t.errors.required;
    } else if (formData.password.length < 6) {
      errors.password = t.errors.password;
    }

    return errors;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear errors on change
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
    setServerError("");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setServerError("");

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token and user data
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data));
        
        // Update auth context
        login(data);
        
        // Redirect to dashboard or home
        router.push(data.isAdmin ? '/admin-dashboard' : '/user-dashboard');
      } else {
        setServerError(data.message || t.errors.server);
      }
    } catch (error) {
      console.error('Login error:', error);
      setServerError(t.errors.server);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Google login success
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      // Send Google token to your backend for verification
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: credentialResponse.credential
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data));
        login(data);
        router.push(data.isAdmin ? '/admin-dashboard' : '/user-dashboard');
      } else {
        setServerError(data.message || 'Google login failed');
      }
    } catch (error) {
      console.error('Google login error:', error);
      setServerError('Google login failed');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FiLoader className="animate-spin text-4xl text-green-600" />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto h-12 w-12 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl">🏥</span>
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              {t.title}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {t.subtitle}
            </p>
          </div>

          {/* Form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
              {/* Server Error */}
              {serverError && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                  {serverError}
                </div>
              )}

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.emailLabel}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-3 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                      formErrors.email 
                        ? 'border-red-300 bg-red-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    placeholder={t.emailPlaceholder}
                  />
                </div>
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.passwordLabel}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-10 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                      formErrors.password 
                        ? 'border-red-300 bg-red-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    placeholder={t.passwordPlaceholder}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                {formErrors.password && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.password}</p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    {t.rememberMe}
                  </label>
                </div>
                <div className="text-sm">
                  <button
                    type="button"
                    onClick={() => router.push('/forgot-password')}
                    className="font-medium text-green-600 hover:text-green-500 transition-colors"
                  >
                    {t.forgotPassword}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <FiLoader className="animate-spin h-5 w-5" />
                ) : (
                  t.loginButton
                )}
              </button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">{t.loginWith}</span>
                </div>
              </div>

              {/* Google Login */}
              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => setServerError('Google login failed')}
                  size="large"
                  width="100%"
                />
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                {t.noAccount}{' '}
                <button
                  type="button"
                  onClick={() => router.push('/register')}
                  className="font-medium text-green-600 hover:text-green-500 transition-colors"
                >
                  {t.signUp}
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default LoginPage;