"use client";

import { useRouter } from 'next/navigation';

export default function Footer() {
  const router = useRouter();

  const sections = [
    {
      title: "Get to Know Us",
      links: [
        { label: "About MediStore", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Press Releases", href: "/press" },
        { label: "Health Science", href: "/science" },
      ],
    },
    {
      title: "Connect with Us",
      links: [
        { label: "Facebook", href: "https://facebook.com" },
        { label: "Twitter", href: "https://twitter.com" },
        { label: "Instagram", href: "https://instagram.com" },
      ],
    },
    {
      title: "Make Money with Us",
      links: [
        { label: "Sell on MediStore", href: "/sell" },
        { label: "Become an Affiliate", href: "/affiliate" },
        { label: "Advertise Your Products", href: "/advertise" },
      ],
    },
    {
      title: "Let Us Help You",
      links: [
        { label: "Your Account", href: "/account" },
        { label: "Returns Centre", href: "/returns" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Help", href: "/help" },
      ],
    },
  ];

  return (
    <footer className="bg-gray-200 text-black text-sm mt-10">
      {/* Back to top */}
      <div
        className="text-center py-3 bg-gray-300 cursor-pointer hover:bg-gray-400"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        Back to top
      </div>

      {/* Links sections */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 border-b border-gray-400">
        {sections.map((section, idx) => (
          <div key={idx}>
            <h3 className="font-semibold mb-2">{section.title}</h3>
            <ul>
              {section.links.map((link, i) => (
                <li
                  key={i}
                  className="mb-1 cursor-pointer hover:text-green-700 transition-colors"
                  onClick={() => router.push(link.href)}
                >
                  {link.label}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col md:flex-row items-center justify-between px-4 py-4 bg-gray-300 text-xs">
        <div className="flex items-center space-x-2 mb-2 md:mb-0">
          <span>🌐</span>
          <select
            className="bg-gray-200 border border-gray-400 px-2 py-1 rounded"
            defaultValue="en"
          >
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
            <option value="ur">اردو</option>
          </select>
          <button
            onClick={() => router.push('/country')}
            className="flex items-center space-x-1 bg-gray-200 border border-gray-400 px-2 py-1 rounded"
          >
            🇮🇳 <span>India</span>
          </button>
        </div>
        <div className="text-center md:text-right">
          © {new Date().getFullYear()} MediStore. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
