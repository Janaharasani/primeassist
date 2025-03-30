"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import LayoutXPadding from "./LayoutXPadding";

const footerLinks = [
  {
    label: "Company",
    options: [
      { label: "About", href: "/about" },
      { label: "Home", href: "/" },
      { label: "Chatbot", href: "/chatbot" },
      { label: "Booking", href: "/booking" },
      { label: "Admin", href: "/admin" },
    ],
  },
  {
    label: "Contact",
    options: [
      { label: "+92 304 0496627", href: "tel:+923040496627" },
      { label: "primeassistsa@gmail.com", href: "mailto:primeassistsa@gmail.com" },
    ],
  },
  {
    label: "Our Platforms",
    options: [
      {
        label: "Instagram",
        href: "https://www.instagram.com/primeassistsa/",
        target: "_blank",
      },
      {
        label: "Twitter",
        href: "https://www.twitter.com/primeassistsa/",
        target: "_blank",
      },
      {
        label: "Facebook",
        href: "https://www.facebook.com/primeassistsa/",
        target: "_blank",
      },
     
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/primeassistsa/",
        target: "_blank",
      },
     
    ],
  },
 
];

const HomepageFooter = ({ className }) => {
  useEffect(() => {
    const section = window.location.hash.replace("#", "");
    if (section) {
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const onSocialClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <LayoutXPadding>
      <footer className={`${className} bg-gray-50 pt-10 pb-6`}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Left Section */}
          <div className="space-y-4 text-center md:text-left ">
            <div className="flex space-x-1">
             <Image src="/icon.png" width={40} height={40} alt="Logo" className="" />
            <h2 className="text-3xl font-bold text-primary">Primeassistsa</h2> </div>
            <p className="text-gray-500 text-sm font-semibold">
               For ultimate convenience.
            </p>
            <p className="text-gray-500 text-sm font-semibold">
             Powered by Primeassistsa. EIN: 86-2956026. 501(c).
            </p>
          </div>

          {/* Center Links */}
          <div className="flex flex-wrap justify-between md:justify-evenly gap-6 col-span-3">
            {footerLinks.map((section, i) => (
              <FooterColumn key={i} options={section} />
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-6 border-t pt-4 flex flex-col items-center md:flex-row md:justify-between text-sm text-gray-500">
          <span>&copy; {new Date().getFullYear()} primeassistsa. All rights reserved.</span>
          <div className="flex justify-center md:justify-end items-center space-x-4 mt-4 md:mt-0">
            <Image
              src="/instagram-icon-footer.png"
              alt="Instagram"
              className="cursor-pointer"
              width={30}
              height={30}
              onClick={() =>
                onSocialClick("https://www.instagram.com/primeassistsa")
              }
            />
            <Image
              src="/twitter-icon-footer.png"
              alt="Twitter"
              className="cursor-pointer"
              width={30}
              height={30}
              onClick={() =>
                onSocialClick("https://www.twitter.com/primeassistsa")
              }
            />
            <Image
              src="/linkedin-icon-footer.png"
              alt="LinkedIn"
              className="cursor-pointer"
              width={30}
              height={30}
              onClick={() =>
                onSocialClick("https://www.linkedin.com/company/primeassistsa")
              }
            />
            <Image
              src="/facebook-icon-footer.png"
              alt="Facebook"
              className="cursor-pointer"
              width={30}
              height={30}
              onClick={() =>
                onSocialClick("https://www.facebook.com/primeassistsa")
              }
            />
          
          </div>
        </div>
      </footer>
    </LayoutXPadding>
  );
};

export default HomepageFooter;

const FooterColumn = ({
  className,
  options = { label: "Company", options: [{ label: "about", href: "/" }] },
}) => {
  return (
    <div className={`${className} row`}>
      <h3 className="mb-2 text-xl font-bold text-[#170D23]">
        {options.label}
      </h3>
      <ul className="space-y-4 text-sm font-light text-[#4A525D]">
        {options?.options.map((option, index) => (
          <li key={index}>
            {option?.href ? (
              <Link
                href={option?.href}
                target={option?.target ? "_blank" : "_self"}
                rel={option?.target ? "noopener noreferrer" : undefined}
                className="flex items-center justify-start gap-2 text-nowrap capitalize hover:text-primary"
              >
                {option?.label}
                <Image
                  alt="external link icon"
                  height={16}
                  width={16}
                  src="/arrow-down-left.png"
                  className="inline-block"
                />
              </Link>
            ) : (
              option.label
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};