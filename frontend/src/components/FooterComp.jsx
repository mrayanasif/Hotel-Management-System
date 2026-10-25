import React from "react";
import { NavLink } from "react-router-dom";

import { MapPin, Phone, Mail, Send } from "lucide-react";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";

function FooterComp() {
  return (
    <footer className="bg-[#111111] text-white pt-20 pb-8">
      <div
        className="max-w-7xl mx-auto px-6"
        data-aos="fade-up"
        data-aos-anchor-placement="center-bottom"
      >
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
          {/* Logo */}

          <div>
            <h2 className="text-4xl font-bold text-amber-500 mb-5">
              LuxuryStay
            </h2>

            <p className="text-gray-400 leading-8 mb-6">
              Experience elegance, comfort and unforgettable hospitality in
              every stay. LuxuryStay offers premium rooms and world-class
              services for every guest.
            </p>

            <div className="flex gap-4">
              <a
                href="#"
                className="bg-amber-600 p-3 rounded-full hover:bg-amber-700 transition"
              >
                <FaFacebookF size={18} />
              </a>

              <a
                href="#"
                className="bg-amber-600 p-3 rounded-full hover:bg-amber-700 transition"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                className="bg-amber-600 p-3 rounded-full hover:bg-amber-700 transition"
              >
                <FaXTwitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}

          <div>
            <h3 className="text-2xl font-semibold mb-6">Quick Links</h3>

            <ul className="space-y-4 text-gray-400">
              <li>
                <NavLink to="/">Home</NavLink>
              </li>

              <li>
                <NavLink to="/about">About</NavLink>
              </li>

              <li>
                <NavLink to="/rooms">Rooms</NavLink>
              </li>

              <li>
                <NavLink to="/services">Services</NavLink>
              </li>

              <li>
                <NavLink to="/booking">Booking</NavLink>
              </li>
            </ul>
          </div>

          {/* Contact */}

          <div>
            <h3 className="text-2xl font-semibold mb-6">Contact</h3>

            <div className="space-y-5 text-gray-400">
              <div className="flex gap-3">
                <MapPin className="text-amber-500" />

                <p>Clifton Block 5, Karachi, Pakistan</p>
              </div>

              <div className="flex gap-3">
                <Phone className="text-amber-500" />

                <p>+92 300 1234567</p>
              </div>

              <div className="flex gap-3">
                <Mail className="text-amber-500" />

                <p>luxury-stay@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Newsletter */}

          <div>
            <h3 className="text-2xl font-semibold mb-6">Newsletter</h3>

            <p className="text-gray-400 mb-6">
              Subscribe to receive our latest offers and exclusive hotel deals.
            </p>

            <div className="flex">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-l-xl text-white bg-[#222] outline-none"
              />

              <button className="bg-amber-600 px-5 rounded-r-xl hover:bg-amber-700 transition">
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}

        <div className="border-t border-gray-700 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500">
            © 2026 LuxuryStay Hotel. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default FooterComp;
