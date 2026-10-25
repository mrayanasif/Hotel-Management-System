import React, { useEffect, useState } from "react";
import api from "../api/axios";
import RoomCard from "../components/RoomCard";
import roomBannerImg from "../assets/images/room-page-banner-01.jpg";
import RoomBannerComp from "../components/RoomBanner";
import TestimonialComp from "../components/TestimonialComp";
import FacilityComp from "../components/FacilityComp";
import AvailabilityComp from "../components/AvailabilityComp";

function Rooms() {
  const [filter, setFilter] = useState("All");
  const [rooms, setRooms] = useState([]);

  // We used  Fetch method for bringinh Rooms from mongo
  const fetchRooms = async () => {
    try {
      const response = await api.get("/rooms/all-rooms");

      console.log(response.data);

      setRooms(response.data.rooms);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // Filter Rooms (Single, Double, Deluxe, Suite)
  const filteredRooms = rooms.filter((room) => {
    if (filter === "All") {
      return true;
    }

    return room.roomType === filter;
  });

  return (
    <>
      {/* Hero Section */}

      <section className="relative h-[80vh]">
        <img
          src={roomBannerImg}
          alt="Rooms Banner"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50"></div>

        <div className="absolute inset-0 flex flex-col justify-center items-center">
          <h1 className="text-6xl font-bold text-white">Our Luxury Rooms</h1>
        </div>
      </section>

      {/* Rooms Section */}

      <section className="py-24 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-6">
          {/* Heading */}

          <div className="text-center mb-20">
            <p className="uppercase tracking-[6px] text-amber-600 font-semibold">
              Luxury Collection
            </p>

            <h2 className="text-5xl font-bold mt-4">
              Choose Your Perfect Room
            </h2>

            <p className="text-gray-600 mt-5 max-w-2xl mx-auto">
              Discover our collection of luxurious rooms designed to provide
              comfort, elegance and unforgettable memories.
            </p>
          </div>

          {/* Filter Buttons */}

          <div className="flex justify-center gap-5 mb-12 flex-wrap">
            <button
              onClick={() => setFilter("All")}
              className={`px-8 py-3 rounded-full border transition-all duration-300 hover:scale-105 ${
                filter === "All"
                  ? "bg-amber-600 text-white border-amber-600 shadow-lg"
                  : "bg-white hover:bg-amber-50 hover:border-amber-600"
              }`}
            >
              All
            </button>

            <button
              onClick={() => setFilter("Single")}
              className={`px-8 py-3 rounded-full border transition-all duration-300 hover:scale-105 ${
                filter === "Single"
                  ? "bg-amber-600 text-white border-amber-600 shadow-lg"
                  : "bg-white hover:bg-amber-50 hover:border-amber-600"
              }`}
            >
              Single
            </button>

            <button
              onClick={() => setFilter("Double")}
              className={`px-8 py-3 rounded-full border transition-all duration-300 hover:scale-105 ${
                filter === "Double"
                  ? "bg-amber-600 text-white border-amber-600 shadow-lg"
                  : "bg-white hover:bg-amber-50 hover:border-amber-600"
              }`}
            >
              Double
            </button>

            <button
              onClick={() => setFilter("Deluxe")}
              className={`px-8 py-3 rounded-full border transition-all duration-300 hover:scale-105 ${
                filter === "Deluxe"
                  ? "bg-amber-600 text-white border-amber-600 shadow-lg"
                  : "bg-white hover:bg-amber-50 hover:border-amber-600"
              }`}
            >
              Deluxe
            </button>

            <button
              onClick={() => setFilter("Suite")}
              className={`px-8 py-3 rounded-full border transition-all duration-300 hover:scale-105 ${
                filter === "Suite"
                  ? "bg-amber-600 text-white border-amber-600 shadow-lg"
                  : "bg-white hover:bg-amber-50 hover:border-amber-600"
              }`}
            >
              Suite
            </button>
          </div>

          {/* Showing Rooms */}

          <p className="text-center text-gray-500 mb-14">
            Showing{" "}
            <span className="font-bold text-amber-600">
              {filteredRooms.length}
            </span>{" "}
            Rooms
          </p>

          {/* Room Cards */}

          <div className="grid lg:grid-cols-2 gap-12">
            {filteredRooms.map((room) => (
              <RoomCard key={room._id} room={room} />
            ))}
          </div>
        </div>
      </section>
      <FacilityComp />
      <RoomBannerComp />
      <AvailabilityComp />
      <TestimonialComp />
    </>
  );
}

export default Rooms;
