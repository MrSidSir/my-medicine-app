// app/context/LanguageProvider.js
"use client";

import React, { createContext, useState, useContext, useEffect } from 'react';

// Language translations
const translations = {
  en: {
    // Navbar
    home: "Home",
    about: "About",
    contact: "Contact",
    categories: "Categories",
    searchPlaceholder: "Search medicines...",
    dashboard: "Dashboard",
    logout: "Logout",
    login: "Login",
    signUp: "Sign Up",
    freeDelivery: "📦 Free delivery for orders above ₹500",
    
    // Common
    loading: "Loading...",
    submit: "Submit",
    cancel: "Cancel",
    save: "Save",
    edit: "Edit",
    delete: "Delete",
    
    // Contact Page
    contactUs: "Contact Us",
    contactSubtitle: "We're here to help with all your medical needs",
    getInTouch: "Get in Touch",
    contactDescription: "Have questions about your medications or need assistance? Our team of healthcare professionals is ready to help you.",
    phone: "Phone",
    email: "Email",
    address: "Address",
    workingHours: "Working Hours",
    emergencySupport: "Emergency Support",
    emergencyText: "For urgent medical assistance:",
    available24x7: "Available 24/7",
    sendMessage: "Send us a Message",
    fullName: "Full Name",
    emailAddress: "Email Address",
    phoneNumber: "Phone Number",
    category: "Category",
    subject: "Subject",
    message: "Message",
    sending: "Sending...",
    sendMessageBtn: "Send Message",
    
    // Categories
    generalInquiry: "General Inquiry",
    orderSupport: "Order Support",
    prescriptionHelp: "Prescription Help",
    deliveryIssue: "Delivery Issue",
    complaint: "Complaint",
    feedback: "Feedback",
    
    // Success/Error Messages
    messageSuccess: "✅ Thank you! Your message has been sent successfully.",
    messageError: "❌ Something went wrong. Please try again.",
    
    // Placeholders
    enterFullName: "Enter your full name",
    enterEmail: "Enter your email",
    enterPhone: "Enter your phone number",
    enterSubject: "Enter message subject",
    typeMessage: "Type your message here...",
    
    // Additional Info
    quickResponse: "Quick Response",
    quickResponseDesc: "We typically respond to emails within 2-4 hours during business hours",
    expertSupport: "Expert Support",
    expertSupportDesc: "Our qualified pharmacists are here to answer your medication questions",
    phoneSupport: "Phone Support",
    phoneSupportDesc: "Call us for immediate assistance with your orders and prescriptions"
  },
  
  hi: {
    // Navbar
    home: "होम",
    about: "हमारे बारे में",
    contact: "संपर्क",
    categories: "श्रेणियां",
    searchPlaceholder: "दवाइयां खोजें...",
    dashboard: "डैशबोर्ड",
    logout: "लॉगआउट",
    login: "लॉगिन",
    signUp: "साइन अप",
    freeDelivery: "📦 ₹500 से अधिक के ऑर्डर पर मुफ्त डिलीवरी",
    
    // Common
    loading: "लोड हो रहा है...",
    submit: "जमा करें",
    cancel: "रद्द करें",
    save: "सेव करें",
    edit: "संपादित करें",
    delete: "हटाएं",
    
    // Contact Page
    contactUs: "हमसे संपर्क करें",
    contactSubtitle: "हम आपकी सभी चिकित्सा आवश्यकताओं में मदद के लिए यहाँ हैं",
    getInTouch: "संपर्क में रहें",
    contactDescription: "आपकी दवाओं के बारे में कोई प्रश्न है या सहायता चाहिए? हमारी स्वास्थ्य पेशेवरों की टीम आपकी मदद के लिए तैयार है।",
    phone: "फोन",
    email: "ईमेल",
    address: "पता",
    workingHours: "कार्य समय",
    emergencySupport: "आपातकालीन सहायता",
    emergencyText: "तत्काल चिकित्सा सहायता के लिए:",
    available24x7: "24/7 उपलब्ध",
    sendMessage: "हमें संदेश भेजें",
    fullName: "पूरा नाम",
    emailAddress: "ईमेल पता",
    phoneNumber: "फोन नंबर",
    category: "श्रेणी",
    subject: "विषय",
    message: "संदेश",
    sending: "भेजा जा रहा है...",
    sendMessageBtn: "संदेश भेजें",
    
    // Categories
    generalInquiry: "सामान्य पूछताछ",
    orderSupport: "ऑर्डर सहायता",
    prescriptionHelp: "पर्चे की मदद",
    deliveryIssue: "डिलीवरी समस्या",
    complaint: "शिकायत",
    feedback: "फीडबैक",
    
    // Success/Error Messages
    messageSuccess: "✅ धन्यवाद! आपका संदेश सफलतापूर्वक भेज दिया गया है।",
    messageError: "❌ कुछ गलत हुआ। कृपया फिर से कोशिश करें।",
    
    // Placeholders
    enterFullName: "अपना पूरा नाम दर्ज करें",
    enterEmail: "अपना ईमेल दर्ज करें",
    enterPhone: "अपना फोन नंबर दर्ज करें",
    enterSubject: "संदेश का विषय दर्ज करें",
    typeMessage: "यहाँ अपना संदेश टाइप करें...",
    
    // Additional Info
    quickResponse: "त्वरित प्रतिक्रिया",
    quickResponseDesc: "हम आमतौर पर व्यावसायिक घंटों के दौरान 2-4 घंटे के भीतर ईमेल का जवाब देते हैं",
    expertSupport: "विशेषज्ञ सहायता",
    expertSupportDesc: "हमारे योग्य फार्मासिस्ट आपके दवा संबंधी प्रश्नों का उत्तर देने के लिए यहाँ हैं",
    phoneSupport: "फोन सहायता",
    phoneSupportDesc: "अपने ऑर्डर और पर्चे के साथ तत्काल सहायता के लिए हमें कॉल करें"
  },
  
  ur: {
    // Navbar
    home: "ہوم",
    about: "ہمارے بارے میں",
    contact: "رابطہ",
    categories: "اقسام",
    searchPlaceholder: "دوائیں تلاش کریں...",
    dashboard: "ڈیش بورڈ",
    logout: "لاگ آؤٹ",
    login: "لاگ ان",
    signUp: "سائن اپ",
    freeDelivery: "📦 ₹500 سے زیادہ کے آرڈر پر مفت ڈیلیوری",
    
    // Common
    loading: "لوڈ ہو رہا ہے...",
    submit: "جمع کریں",
    cancel: "منسوخ کریں",
    save: "محفوظ کریں",
    edit: "ترمیم کریں",
    delete: "حذف کریں",
    
    // Contact Page
    contactUs: "ہم سے رابطہ کریں",
    contactSubtitle: "ہم آپ کی تمام طبی ضروریات میں مدد کے لیے یہاں ہیں",
    getInTouch: "رابطے میں رہیں",
    contactDescription: "آپ کی دوائیوں کے بارے میں کوئی سوال ہے یا مدد چاہیے؟ ہماری صحت کے پیشہ ورانہ ٹیم آپ کی مدد کے لیے تیار ہے۔",
    phone: "فون",
    email: "ای میل",
    address: "پتہ",
    workingHours: "کام کے اوقات",
    emergencySupport: "ہنگامی مدد",
    emergencyText: "فوری طبی مدد کے لیے:",
    available24x7: "24/7 دستیاب",
    sendMessage: "ہمیں پیغام بھیجیں",
    fullName: "پورا نام",
    emailAddress: "ای میل ایڈریس",
    phoneNumber: "فون نمبر",
    category: "قسم",
    subject: "موضوع",
    message: "پیغام",
    sending: "بھیجا جا رہا ہے...",
    sendMessageBtn: "پیغام بھیجیں",
    
    // Categories
    generalInquiry: "عمومی استفسار",
    orderSupport: "آرڈر سپورٹ",
    prescriptionHelp: "نسخے کی مدد",
    deliveryIssue: "ڈیلیوری کا مسئلہ",
    complaint: "شکایت",
    feedback: "فیڈبیک",
    
    // Success/Error Messages
    messageSuccess: "✅ شکریہ! آپ کا پیغام کامیابی سے بھیج دیا گیا ہے۔",
    messageError: "❌ کچھ غلط ہوا۔ براہ کرم دوبارہ کوشش کریں۔",
    
    // Placeholders
    enterFullName: "اپنا پورا نام داخل کریں",
    enterEmail: "اپنی ای میل داخل کریں",
    enterPhone: "اپنا فون نمبر داخل کریں",
    enterSubject: "پیغام کا موضوع داخل کریں",
    typeMessage: "یہاں اپنا پیغام ٹائپ کریں...",
    
    // Additional Info
    quickResponse: "فوری جواب",
    quickResponseDesc: "ہم عام طور پر کاروباری اوقات کے دوران 2-4 گھنٹے کے اندر ای میل کا جواب دیتے ہیں",
    expertSupport: "ماہر مدد",
    expertSupportDesc: "ہمارے اہل فارماسسٹ آپ کے دوا سے متعلق سوالات کا جواب دینے کے لیے یہاں ہیں",
    phoneSupport: "فون سپورٹ",
    phoneSupportDesc: "اپنے آرڈرز اور نسخوں کے ساتھ فوری مدد کے لیے ہمیں کال کریں"
  }
};

// Create Language Context
const LanguageContext = createContext();

// Language Provider Component
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  // Load saved language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('medistore-language');
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage when changed
  const changeLanguage = (newLanguage) => {
    if (translations[newLanguage]) {
      setLanguage(newLanguage);
      localStorage.setItem('medistore-language', newLanguage);
    }
  };

  // Get translation function
  const t = (key) => {
    return translations[language][key] || translations.en[key] || key;
  };

  // Get current language data
  const getCurrentLanguageData = () => {
    return {
      code: language,
      name: language === 'en' ? 'English' : language === 'hi' ? 'हिंदी' : 'اردو',
      direction: language === 'ur' ? 'rtl' : 'ltr'
    };
  };

  const contextValue = {
    language,
    changeLanguage,
    t,
    getCurrentLanguageData,
    translations: translations[language]
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      <div dir={getCurrentLanguageData().direction}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

// Custom hook to use language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Export context for direct use
export { LanguageContext };

// Export translations for external use
export { translations };