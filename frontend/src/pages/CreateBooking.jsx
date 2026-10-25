import React from "react";
import bookingBanner from "../assets/images/booking.jpg";
import BookingForm from "../components/BookingForm";

function CreateBooking() {
  return (
    <>
      {/* Hero Section */}

      <section className="relative h-[65vh]">

        <img
          src={bookingBanner}
          alt="Create Booking"
          className="w-full h-full object-cover"
        />

        {/* Overlay */}

        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">

          <p className="uppercase tracking-[6px] text-amber-400 font-semibold">
            Luxury Stay
          </p>

          <h1 className="text-5xl md:text-6xl font-bold text-white mt-4">
            Create Booking
          </h1>

          <p className="text-gray-200 mt-5 max-w-2xl text-lg">
            Select your room, customize your stay with premium services,
            and reserve your luxury experience.
          </p>

        </div>

      </section>

      {/* Booking Form */}

      <section className="bg-[#faf8f5] py-24">

        <div className="max-w-7xl mx-auto px-6">

          <BookingForm />

        </div>

      </section>
    </>
  );
}

export default CreateBooking;