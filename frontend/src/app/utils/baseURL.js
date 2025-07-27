// src/utils/baseURL.js

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    // Client side
    return "";
  } else {
    // Server side
    return process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  }
};

export default getBaseUrl;
