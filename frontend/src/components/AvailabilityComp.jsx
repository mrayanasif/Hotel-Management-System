import React, { useState } from "react";

import { CalendarDays, BedDouble, PhoneCall, CheckCircle2 } from "lucide-react";
import { toast } from "react-toastify";
function AvailabilityComp() {
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [roomType, setRoomType] = useState("");
  return (
    <>
      <section className="py-24 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side */}

            <div data-aos="fade-right">
              <p className="uppercase tracking-[6px] text-amber-600 font-semibold">
                Check Availability
              </p>

              <h2 className="text-5xl font-bold mt-5 mb-6 uppercase">
                Reserve Your Luxury Stay
              </h2>

              <p className="text-gray-600 leading-8 mb-10">
                Select your preferred dates and room type to check availability.
                If the room is available, you can proceed to the booking page.
              </p>

              <div className="flex items-center gap-4">
                <div className="bg-amber-100 p-4 rounded-full">
                  <PhoneCall className="text-amber-600" size={30} />
                </div>

                <div>
                  <p className="uppercase tracking-[4px] text-gray-500 text-sm">
                    Booking Support
                  </p>

                  <h3 className="text-2xl font-bold">+92 300 1234567</h3>
                </div>
              </div>
            </div>

            {/* Right Side */}

            <div
              data-aos="fade-left"
              className="bg-white rounded-3xl shadow-xl p-10"
            >
              {/* Check In */}

              <label className="font-semibold mb-2 block">Check In</label>

              <div className="relative mb-6">
                <CalendarDays
                  className="absolute left-4 top-4 text-gray-400"
                  size={20}
                />

                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full border rounded-xl py-4 pl-12 pr-4 outline-none focus:border-amber-500"
                />
              </div>

              {/* Check Out */}

              <label className="font-semibold mb-2 block">Check Out</label>

              <div className="relative mb-6">
                <CalendarDays
                  className="absolute left-4 top-4 text-gray-400"
                  size={20}
                />

                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full border rounded-xl py-4 pl-12 pr-4 outline-none focus:border-amber-500"
                />
              </div>

              {/* Room */}

              <label className="font-semibold mb-2 block">Select Room</label>

              <div className="relative mb-8">
                <BedDouble
                  className="absolute left-4 top-4 text-gray-400"
                  size={20}
                />

                <select
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  className="w-full border rounded-xl py-4 pl-12 pr-4 outline-none focus:border-amber-500"
                >
                  <option value="">Select Room</option>
                  <option value="Single Room">Single Room</option>
                  <option value="Double Room">Double Room</option>
                  <option value="Deluxe Room">Deluxe Room</option>
                  <option value="Suite">Suite</option>
                </select>
              </div>

              <button
                onClick={() => {
                  const token = localStorage.getItem("token");

                  if (!token) {
                    toast.error(
                      "Please login first to check room availability.",
                    );
                    return;
                  }

                  if (!checkIn || !checkOut || !roomType) {
                    toast.error(
                      "Please select check-in, check-out, and room type.",
                    );
                    return;
                  }

                  setShowAvailabilityModal(true);
                }}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white py-4 rounded-xl transition-all duration-300 shadow hover:shadow-lg hover:scale-105"
              >
                Check Availability
              </button>
            </div>
          </div>
        </div>
      </section>
      {showAvailabilityModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-3xl p-10 max-w-lg w-full">
            <div className="flex justify-center">
              <CheckCircle2 size={70} className="text-green-600" />
            </div>

            <h2 className="text-3xl font-bold text-center mt-5">
              Availability Request Submitted
            </h2>

            <p className="text-gray-600 text-center mt-5 leading-8">
              Thank you for choosing{" "}
              <span className="font-semibold">Luxury Stay</span>.
              <br />
              <br />
              We have received your request for a <strong>
                {roomType}
              </strong>{" "}
              from <strong>{checkIn}</strong> to <strong>{checkOut}</strong>.Our
              reservation team will review your request and contact you through
              your registered email with the availability details shortly.
            </p>

            <div className="flex justify-center mt-8">
              <button
                onClick={() => setShowAvailabilityModal(false)}
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default AvailabilityComp;
