import React from "react";

import AboutComp from "../components/AboutComp";

import aboutbanner from "../assets/images/about-banner.jpg";

import { Hotel, Users, Wifi, UtensilsCrossed } from "lucide-react";
import { useNavigate } from "react-router-dom";

function About() {
   const navigate = useNavigate();
  return (
    <>
      {/* Hero Banner */}

      <section className="relative h-[70vh]">
        <img
          src={aboutbanner}
          alt="About Banner"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50"></div>

        <div className="absolute inset-0 flex flex-col justify-center items-center">
          <h1 className="text-6xl font-bold text-white">About Us</h1>

          <p className="text-white mt-4 text-lg">Home / About</p>
        </div>
      </section>

      {/* Reuse Home About Component */}

      <AboutComp />

      {/* Why Choose Us */}

      <section className="py-24 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="uppercase tracking-[6px] text-amber-600 font-semibold">
              Why Choose Us
            </p>

            <h2 className="text-5xl font-bold mt-4">
              Experience Luxury Like Never Before
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow text-center hover:-translate-y-2 transition">
              <Hotel className="mx-auto text-amber-600 mb-5" size={45} />
              <h3 className="text-xl font-bold mb-3">Luxury Rooms</h3>
              <p className="text-gray-600">
                Beautifully designed rooms with modern comfort.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow text-center hover:-translate-y-2 transition">
              <Users className="mx-auto text-amber-600 mb-5" size={45} />
              <h3 className="text-xl font-bold mb-3">Expert Staff</h3>
              <p className="text-gray-600">
                Friendly professionals available 24/7.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow text-center hover:-translate-y-2 transition">
              <UtensilsCrossed
                className="mx-auto text-amber-600 mb-5"
                size={45}
              />
              <h3 className="text-xl font-bold mb-3">Fine Dining</h3>
              <p className="text-gray-600">
                Delicious meals prepared by expert chefs.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow text-center hover:-translate-y-2 transition">
              <Wifi className="mx-auto text-amber-600 mb-5" size={45} />
              <h3 className="text-xl font-bold mb-3">Free WiFi</h3>
              <p className="text-gray-600">
                High-speed internet throughout the hotel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">
            <div>
              <h2 className="text-5xl font-bold text-amber-600">500+</h2>

              <p className="mt-3 text-gray-600">Happy Guests</p>
            </div>

            <div>
              <h2 className="text-5xl font-bold text-amber-600">80+</h2>

              <p className="mt-3 text-gray-600">Luxury Rooms</p>
            </div>

            <div>
              <h2 className="text-5xl font-bold text-amber-600">10+</h2>

              <p className="mt-3 text-gray-600">Years Experience</p>
            </div>

            <div>
              <h2 className="text-5xl font-bold text-amber-600">24/7</h2>

              <p className="mt-3 text-gray-600">Customer Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="py-24 bg-gradient-to-r from-amber-700 via-amber-600 to-yellow-500 text-center">
        <h2 className="text-5xl font-bold text-white">
          Ready For Your Luxury Stay?
        </h2>

        <p className="text-white mt-6 max-w-2xl mx-auto">
          Experience world-class hospitality, luxurious rooms and unforgettable
          memories with Luxury Stay Hotel.
        </p>

        <button  onClick={() => navigate("/CreateBooking")}
        className="mt-10 px-10 py-4 bg-white text-amber-600 rounded-full font-semibold hover:bg-gray-100 transition">
          Book Your Stay
        </button>
      </section>
    </>
  );
}

export default About;
