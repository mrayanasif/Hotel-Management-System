import React from "react";
import {
  ParkingCircle,
  Wifi,
  UtensilsCrossed,
  Waves,
  Dumbbell,
  Shirt,
  BellRing,
  Plane,
} from "lucide-react";

function FacilityComp() {
  return (
    <section className="py-24 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20" data-aos="fade-up">
          <p className="uppercase tracking-[6px] text-amber-600 font-semibold">
            Premium Facilities
          </p>

          <h2 className="text-5xl font-bold text-gray-900 mt-4">
            Everything You Need
          </h2>

          <p className="text-gray-600 mt-5 max-w-2xl mx-auto">
            Enjoy world-class facilities designed to make every stay relaxing,
            comfortable and unforgettable.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card */}

          <div
            data-aos="fade-up"
            className="bg-white rounded-2xl p-8 text-center shadow hover:-translate-y-2 transition duration-500"
          >
            <ParkingCircle size={55} className="mx-auto text-amber-600 mb-6" />

            <h3 className="text-2xl font-semibold mb-4">Private Parking</h3>

            <p className="text-gray-600">
              Secure parking available 24/7 for all hotel guests.
            </p>
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay="150"
            className="bg-white rounded-2xl p-8 text-center shadow hover:-translate-y-2 transition duration-500"
          >
            <Wifi size={55} className="mx-auto text-amber-600 mb-6" />

            <h3 className="text-2xl font-semibold mb-4">High-Speed WiFi</h3>

            <p className="text-gray-600">
              Fast internet connectivity throughout the hotel.
            </p>
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="bg-white rounded-2xl p-8 text-center shadow hover:-translate-y-2 transition duration-500"
          >
            <UtensilsCrossed
              size={55}
              className="mx-auto text-amber-600 mb-6"
            />

            <h3 className="text-2xl font-semibold mb-4">Restaurant</h3>

            <p className="text-gray-600">
              Experience delicious cuisine prepared by expert chefs.
            </p>
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay="450"
            className="bg-white rounded-2xl p-8 text-center shadow hover:-translate-y-2 transition duration-500"
          >
            <Waves size={55} className="mx-auto text-amber-600 mb-6" />

            <h3 className="text-2xl font-semibold mb-4">Swimming Pool</h3>

            <p className="text-gray-600">
              Relax and refresh in our luxurious outdoor pool.
            </p>
          </div>

          <div
            data-aos="fade-up"
            className="bg-white rounded-2xl p-8 text-center shadow hover:-translate-y-2 transition duration-500"
          >
            <Dumbbell size={55} className="mx-auto text-amber-600 mb-6" />

            <h3 className="text-2xl font-semibold mb-4">Fitness Center</h3>

            <p className="text-gray-600">
              Fully equipped gym with modern workout machines.
            </p>
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay="150"
            className="bg-white rounded-2xl p-8 text-center shadow hover:-translate-y-2 transition duration-500"
          >
            <Shirt size={55} className="mx-auto text-amber-600 mb-6" />

            <h3 className="text-2xl font-semibold mb-4">Laundry Service</h3>

            <p className="text-gray-600">
              Professional laundry and dry cleaning service available.
            </p>
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="bg-white rounded-2xl p-8 text-center shadow hover:-translate-y-2 transition duration-500"
          >
            <BellRing size={55} className="mx-auto text-amber-600 mb-6" />

            <h3 className="text-2xl font-semibold mb-4">Room Service</h3>

            <p className="text-gray-600">
              24/7 room service delivered right to your door.
            </p>
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay="450"
            className="bg-white rounded-2xl p-8 text-center shadow hover:-translate-y-2 transition duration-500"
          >
            <Plane size={55} className="mx-auto text-amber-600 mb-6" />

            <h3 className="text-2xl font-semibold mb-4">Airport Pickup</h3>

            <p className="text-gray-600">
              Convenient airport transfer for a hassle-free arrival.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FacilityComp;
