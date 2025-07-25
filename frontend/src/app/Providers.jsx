"use client";

import { Provider } from "react-redux";
import { store } from "../redux/store";
import { AuthProvider } from "../context/AuthContext";
import { LanguageProvider } from "../context/LanguageProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";

/**
 * Wraps the app with:
 * - Redux Provider
 * - Google OAuth Provider
 * - Language Provider
 * - Auth Context
 */
export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId="816729884060-1h81ga3m83oatbpu4m4mvfctn5n2stqn.apps.googleusercontent.com">
        <LanguageProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </LanguageProvider>
      </GoogleOAuthProvider>
    </Provider>
  );
}
