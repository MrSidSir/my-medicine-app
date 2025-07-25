// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "./Providers";
import "./globals.css";

// Load fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MedStore - Buy Medicines Online",
  description: "Your trusted online pharmacy with genuine medicines delivered to your doorstep.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Optional meta for responsiveness */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
