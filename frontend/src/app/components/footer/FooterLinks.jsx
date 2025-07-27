import React from "react";
import { useRouter } from 'next/navigation';

function safePush(router, href) {
  try {
    router.push(href);
  } catch (e) {
    alert('Page not found or navigation error.');
  }
}

const FooterLinks = ({ title, links }) => {
  const router = useRouter();
  return (
    <div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <ul>
        {links.map((link, i) => (
          <li
            key={i}
            className="mb-1 cursor-pointer hover:text-green-700 transition-colors"
            onClick={() => safePush(router, link.href)}
          >
            {link.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterLinks; 