import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa6";
import { FaCcVisa, FaCcMastercard, FaPaypal } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-white">
      {/* Black Box Section */}
      <div className="bg-black text-white p-6 mx-auto mb-[-50px] rounded-2xl max-w-7xl relative z-10">
        <div className="flex justify-between items-center flex-col md:flex-row">
          {/* Left Side: Text */}
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold">Stay Updated</h3>
            <p>Sign up for the latest updates and offers</p>
          </div>

          {/* Right Side: Input Placeholders */}
          <div className="flex flex-col gap-4 w-full md:w-auto">
            <input
              type="text"
              placeholder="Enter your name"
              className="p-2 focus:outline-none text-black rounded-2xl"
            />
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 focus:outline-none text-black rounded-2xl"
            />
          </div>
        </div>
      </div>

      {/* Grey Footer Section */}
      <div className="bg-[#F0F0F0] text-black py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-6 pt-10 border-b pb-8">
          {/* Column 1: Logo */}
          <div>
            <h2 className="text-lg font-bold">SHOP.CO</h2>
            <p className="mt-2 text-sm">
              Discover the best deals and offers at our e-commerce platform.
            </p>
            <div className="flex gap-4 mt-4">
              <FaFacebook className="text-xl cursor-pointer" />
              <FaTwitter className="text-xl cursor-pointer" />
              <FaInstagram className="text-xl cursor-pointer" />
              <FaLinkedin className="text-xl cursor-pointer" />
            </div>
          </div>

          {/* Column 2: Company */}
          <div>
            <h3 className="text-lg font-bold mb-2">Company</h3>
            <ul className="space-y-2">
              <li>About Us</li>
              <li>Careers</li>
              <li>Press</li>
              <li>Blog</li>
            </ul>
          </div>

          {/* Column 3: Help */}
          <div>
            <h3 className="text-lg font-bold mb-2">Help</h3>
            <ul className="space-y-2">
              <li>FAQs</li>
              <li>Shipping</li>
              <li>Returns</li>
              <li>Order Status</li>
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div>
            <h3 className="text-lg font-bold mb-2">Resources</h3>
            <ul className="space-y-2">
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
              <li>Support Center</li>
              <li>Affiliate Program</li>
            </ul>
          </div>

          {/* Column 5: Contact */}
          <div>
            <h3 className="text-lg font-bold mb-2">Contact</h3>
            <ul className="space-y-2">
              <li>Email: support@ecommerce.com</li>
              <li>Phone: +1 (123) 456-7890</li>
              <li>Address: 123 Main St, City, Country</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 px-4">
          {/* Left Side: Text */}
          <p className="text-sm text-center md:text-left">
            © 2024 SHOP.CO. All Rights Reserved.
          </p>

          {/* Right Side: Payment Icons */}
          <div className="flex gap-4 mt-4 md:mt-0">
            <FaCcVisa className="text-2xl text-blue-700" />
            <FaCcMastercard className="text-2xl text-orange-700" />
            <FaPaypal className="text-2xl text-green-700" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
