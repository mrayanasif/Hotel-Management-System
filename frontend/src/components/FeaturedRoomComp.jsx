import singleimg from "../assets/images/single-rooom.jpg";
import doubleimg from "../assets/images/double-room.jpg";
import deluxeimg from "../assets/images/deluxe-room.jpg";

import { useNavigate } from "react-router-dom";
import suiteimg from "../assets/images/suite-room.jpg";

// import { iconssd } from "lucide-react";
import {
  Wifi,
  Tv,
  Trees,
  BedDouble,
  Bath,
  Coffee,
  AirVent,
  Waves,
  Dumbbell,
  UtensilsCrossed,
  BedSingle,
  Building2,
  Volleyball,
  PhoneCall,
  ParkingCircle,
} from "lucide-react";

function FeaturedRoomComp() {
  const navigate = useNavigate();
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading  */}

        <div className="text-center mb-20 " data-aos="fade-right">
          <p className="uppercase tracking-[6px] text-amber-600 font-semibold">
            Luxury Rooms, Suites
          </p>

          <h2 className="text-5xl font-bold text-gray-900 mt-4">
            Discover Our Finest Rooms
          </h2>

          <p className="text-gray-600 mt-5 max-w-2xl mx-auto text-lg">
            Choose from our collection of luxurious rooms designed for comfort,
            elegance and unforgettable memories.
          </p>
        </div>

        {/* ================= Room 1 ================= */}

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="overflow-hidden rounded-3xl shadow-2xl group">
            <img
              src={singleimg}
              alt="single-rooom"
              className="w-full h-[500px] object-cover transition duration-700 group-hover:scale-110"
            />
          </div>

          <div>
            <p className="uppercase tracking-[5px] text-amber-600 mb-3">
              Single Room
            </p>

            <h3 className="text-4xl font-bold mb-6">Experience Comfort</h3>

            <p className="text-gray-600 leading-8 mb-8">
              Enjoy a spacious room equipped with modern facilities, elegant
              interiors and breathtaking comfort for both business and leisure
              travelers.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <p className="flex items-center gap-2 text-amber-600">
                <BedSingle size={18} className="text-black" /> Single Bed
              </p>

              <p className="flex items-center gap-2  text-amber-600">
                <Wifi size={18} className="text-black" /> Free WiFi
              </p>

              <p className="flex items-center gap-2  text-amber-600">
                <Tv size={18} className="text-black" /> Smart TV
              </p>

              <p className="flex items-center gap-2  text-amber-600">
                <Coffee size={18} className="text-black" /> Breakfast Included
              </p>

              <p className="flex items-center gap-2  text-amber-600">
                <AirVent size={18} className="text-black" /> Air Conditioned
                Room
              </p>
            </div>

            <h4 className="text-3xl font-bold text-amber-600 mb-8">
              Rs. 12,000 / Night
            </h4>

            <button
              onClick={() => navigate("/rooms")}
              className="bg-amber-600 hover:bg-amber-700 transition text-white px-8 py-4 rounded-full"
            >
              Book Now
            </button>
          </div>
        </div>

        {/* ================= Room 2 ================= */}

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="order-2 lg:order-1">
            <p className="uppercase tracking-[5px] text-amber-600 mb-3">
              Twin Room
            </p>

            <h3 className="text-4xl font-bold mb-6">
              Luxury Beyond Expectations
            </h3>

            <p className="text-gray-600 leading-8 mb-8">
              Designed for couples who appreciate elegance, spacious living and
              exclusive hospitality.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <p className="flex items-center gap-2  text-amber-600">
                <BedDouble size={18} className="text-black" /> Double bed
              </p>

              <p className="flex items-center gap-2  text-amber-600">
                <UtensilsCrossed size={18} className="text-black" />
                Complimentary Breakfast
              </p>

              <p className="flex items-center gap-2  text-amber-600">
                <Wifi size={18} className="text-black" /> Free WiFi
              </p>

              <p className="flex items-center gap-2  text-amber-600">
                <Building2 size={18} className="text-black" /> City View
              </p>

              <p className="flex items-center gap-2  text-amber-600">
                <AirVent size={18} className="text-black" /> Air Conditioned
                Room
              </p>
            </div>

            <h4 className="text-3xl font-bold text-amber-600 mb-8">
              Rs. 25,000 / Night
            </h4>

            <button
              onClick={() => navigate("/rooms")}
              className="bg-amber-600 hover:bg-amber-700 transition text-white px-8 py-4 rounded-full"
            >
              Book Now
            </button>
          </div>

          <div className="order-1 lg:order-2 overflow-hidden rounded-3xl shadow-2xl group">
            <img
              src={doubleimg}
              alt=""
              className="w-full h-[500px] object-cover transition duration-700 group-hover:scale-110"
            />
          </div>
        </div>

        {/* ================= Room 3 ================= */}

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="overflow-hidden rounded-3xl shadow-2xl group">
            <img
              src={deluxeimg}
              alt=""
              className="w-full h-[500px] object-cover transition duration-700 group-hover:scale-110"
            />
          </div>

          <div>
            <p className="uppercase tracking-[5px] text-amber-600 mb-3">
              Family Suite
            </p>

            <h3 className="text-4xl font-bold mb-6">
              Perfect For Family Vacations
            </h3>

            <p className="text-gray-600 leading-8 mb-8">
              Spacious family accommodation offering premium comfort, multiple
              beds and modern facilities for memorable family stays.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <p className="flex items-center gap-2  text-amber-600">
                <BedDouble size={18} className="text-black" /> Two Queen Beds
              </p>

              <p className="flex items-center gap-2  text-amber-600">
                <Wifi size={18} className="text-black" /> Free WiFi
              </p>

              <p className="flex items-center gap-2  text-amber-600">
                <Tv size={18} className="text-black" /> Smart TV
              </p>

              <p className="flex items-center gap-2  text-amber-600">
                <UtensilsCrossed size={18} className="text-black" />
                Complimentary Breakfast
              </p>

              <p className="flex items-center gap-2  text-amber-600">
                <Volleyball size={18} className="text-black" /> Kids Area
              </p>

              <p className="flex items-center gap-2  text-amber-600">
                <PhoneCall size={18} className="text-black" /> Room Service
              </p>

              <p className="flex items-center gap-2  text-amber-600">
                <AirVent size={18} className="text-black" /> Air Conditioned
                Room
              </p>

              <p className="flex items-center gap-2  text-amber-600">
                <ParkingCircle size={18} className="text-black" /> Car Parking
              </p>
            </div>

            <h4 className="text-3xl font-bold text-amber-600 mb-8">
              Rs. 30,000 / Night
            </h4>

            <button
              onClick={() => navigate("/rooms")}
              className="bg-amber-600 hover:bg-amber-700 transition text-white px-8 py-4 rounded-full"
            >
              Book Now
            </button>
          </div>
        </div>

        {/* ================= Room 4 ================= */}

        <div className="grid lg:grid-cols-2 gap-16 items-center mt-32 mb-32">
          <div className="order-2 lg:order-1">
            <p className="uppercase tracking-[5px] text-amber-600 mb-3">
              Royal Suite
            </p>

            <h3 className="text-4xl font-bold mb-6">
              Experience Luxury Like Never Before
            </h3>

            <p className="text-gray-600 leading-8 mb-8 ">
              Our Luxury Suite is thoughtfully designed to provide the perfect
              blend of elegance, comfort, and modern sophistication. Featuring
              spacious interiors, premium furnishings, and breathtaking views,
              every stay promises a relaxing and unforgettable experience for
              both business and leisure travelers.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8  text-amber-600">
              <p className="flex items-center gap-2">
                <BedDouble size={18} className="text-black" /> King Size Bed
              </p>

              <p className="flex items-center gap-2  text-amber-600">
                <UtensilsCrossed size={18} className="text-black" /> Meal
                Included
              </p>

              <p className="flex items-center gap-2  text-amber-600">
                <Wifi size={18} className="text-black" /> High Speed WiFi
              </p>

              <p className="flex items-center gap-2  text-amber-600">
                <Trees size={18} className="text-black" /> Personal Balcony
              </p>

              <p className="flex items-center gap-2  text-amber-600">
                <Dumbbell size={18} className="text-black" /> Fitness Gym
              </p>

              <p className="flex items-center gap-2  text-amber-600">
                <AirVent size={18} className="text-black" /> Air Conditioned
                Room
              </p>

              <p className="flex items-center gap-2  text-amber-600">
                <ParkingCircle size={18} className="text-black" /> Car Parking
              </p>
            </div>

            <h4 className="text-3xl font-bold text-amber-600 mb-8">
              Rs. 65,000 / Night
            </h4>

            <button
              onClick={() => navigate("/rooms")}
              className="bg-amber-600 hover:bg-amber-700 transition text-white px-8 py-4 rounded-full"
            >
              Book Now
            </button>
          </div>

          <div className="order-1 lg:order-2 overflow-hidden rounded-3xl shadow-2xl group">
            <img
              src={suiteimg}
              alt=""
              className="w-full h-[500px] object-cover transition duration-700 group-hover:scale-110"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedRoomComp;
