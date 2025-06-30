import React from "react";
import { useState } from "react";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiYoutube,
} from "react-icons/fi";

const Footer = () => {

   const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:4000/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setMessage("Subscribed successfully!");
      setName("");
      setEmail("");
    } catch (err) {
      setMessage(err.message || "Subscription failed.");
    }
  };

  return (
    <footer className="bg-blue-950 text-white pt-12 pb-6 px-6 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* College Info */}
        <div>
          <h2 className="text-xl font-bold mb-4">SUCCESS DEGREE COLLEGE</h2>
          <p className="text-gray-300 text-sm">
            ಯಶಸ್ಸು ಪದವಿ ಕಾಲೇಜು
            <br />
            Excellence in Education and Student Success.
          </p>
          {/* Social Icons */}
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-blue-400 transition">
              <FiFacebook size={20} />
            </a>
            <a href="#" className="hover:text-blue-400 transition">
              <FiTwitter size={20} />
            </a>
            <a href="#" className="hover:text-blue-400 transition">
              <FiInstagram size={20} />
            </a>
            <a href="#" className="hover:text-blue-400 transition">
              <FiYoutube size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <a href="/" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-white">
                About
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex items-start gap-3">
              <FiMapPin className="mt-1" />
              <span>Gandhi Chowk, Basavakalyan, Karnataka – 585327</span>
            </li>
            <li className="flex items-center gap-3">
              <FiPhone />
              <span>+91 7019830052</span>
            </li>
            <li className="flex items-center gap-3">
              <FiMail />
              <span>contact@successcollege.edu.in</span>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
          <p className="text-sm text-gray-300 mb-4">
            Subscribe to our newsletter to get the latest updates.
          </p>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              value={name}
              placeholder="Your Name"
               onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 text-sm text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="email"
              value={email}
              placeholder="Your Email"
               onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 text-sm text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
            >
              Subscribe
            </button>
            {message && <p className="text-sm mt-2 text-center text-yellow-300">{message}</p>}
          </form>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-blue-800 mt-12 pt-4 text-center text-sm text-gray-400 flex flex-col md:flex-row items-center justify-between gap-2">
        <span>
          &copy; {new Date().getFullYear()} Success Degree College. All rights
          reserved.
        </span>
        <div className="space-x-4">
          <a href="#" className="hover:text-white transition">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white transition">
            Terms & Conditions
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
