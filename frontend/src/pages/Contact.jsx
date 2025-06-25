import React from "react";
import { FiMail, FiPhone, FiMapPin, FiUser, FiMessageSquare } from "react-icons/fi";

const Contact = () => {
  return (
    <section className="bg-gray-50 py-16 px-6 lg:px-32">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold text-center text-blue-700 mb-12">
          Contact Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <form className="bg-white shadow-md rounded-lg p-8 space-y-6">
            <div className="relative">
              <FiUser className="absolute left-3 top-3 text-gray-400 text-lg" />
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded-md py-3 px-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="relative">
              <FiMail className="absolute left-3 top-3 text-gray-400 text-lg" />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border border-gray-300 rounded-md py-3 px-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="relative">
              <FiMessageSquare className="absolute left-3 top-3 text-gray-400 text-lg" />
              <textarea
                placeholder="Your Message"
                rows="5"
                className="w-full border border-gray-300 rounded-md py-3 px-10 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="flex flex-col justify-center bg-white shadow-md rounded-lg p-8 space-y-6">
            <div className="flex items-start gap-4">
              <FiMapPin className="text-blue-600 text-2xl mt-1" />
              <div>
                <h4 className="text-lg font-semibold">Address</h4>
                <p className="text-gray-600">
                  Success Degree College,<br />
                  Gandhi Chowk, Basavakalyan, Karnataka – 585327
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FiPhone className="text-blue-600 text-2xl mt-1" />
              <div>
                <h4 className="text-lg font-semibold">Phone</h4>
                <p className="text-gray-600">+91 7019830052</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FiMail className="text-blue-600 text-2xl mt-1" />
              <div>
                <h4 className="text-lg font-semibold">Email</h4>
                <p className="text-gray-600">contact@successcollege.edu.in</p>
              </div>
            </div>

            <iframe
              className="rounded-lg w-full h-72 mt-6"
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3797.24705356675!2d76.94467237463759!3d17.873897888608784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcf3b7ae685d419%3A0x82689baedcadf431!2sSUCCESS%20UG%20%26%20PG%20COLLEGE%2C%20BASAVAKALYAN!5e0!3m2!1sen!2sin!4v1750866028640!5m2!1sen!2sin"
              
              allowFullScreen=""
              loading="lazy"
              title="College Map"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
