import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function ManageHousekeeping() {

  // ==============================
  // States
  // ==============================

  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ==============================
  // Fetch Cleaning Rooms
  // ==============================
  
const cleaningRooms = rooms.filter(
    (room) => room.availability === "Cleaning"
  );

  const fetchCleaningRooms = async () => {
    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/housekeeping/all-cleaning-rooms",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRooms(response.data.rooms);

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message || "Failed to fetch rooms"
      );

    }
  };

  useEffect(() => {
    fetchCleaningRooms();
  }, []);

  // ==============================
  // Mark Room Clean
  // ==============================

  const handleMarkClean = async () => {
    try {

      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/housekeeping/mark-clean/${selectedRoom._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Room marked as available.");

      setIsModalOpen(false);
      setSelectedRoom(null);

      fetchCleaningRooms();

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message || "Failed to update room"
      );

    }
  };
    return (
    <>
      {/* Header */}

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold uppercase font-serif">
            Housekeeping
          </h1>

          <p className="text-gray-500">
            Manage room cleaning and availability
          </p>
        </div>
      </div>

     

     {/* Dashboard Cards */}

<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

  {/* Rooms In Cleaning */}

  <div className="bg-white rounded-xl shadow p-6">
    <p className="text-gray-500 font-medium">
      Rooms In Cleaning
    </p>

    <h2 className="text-4xl font-bold text-orange-500 mt-2">
      {cleaningRooms.length}
    </h2>
  </div>

  {/* Total Cleaning Tasks */}

  <div className="bg-white rounded-xl shadow p-6">
    <p className="text-gray-500 font-medium">
      Total Cleaning Tasks
    </p>

    <h2 className="text-4xl font-bold text-[#C8A96A] mt-2">
      {cleaningRooms.length}
    </h2>
  </div>

</div>

      {/* Cleaning Rooms Table */}

      <div className="overflow-x-auto bg-white rounded-xl shadow">

        <table className="w-full">

          <thead className="bg-[#1B1B1B] text-[#C8A96A] uppercase">

            <tr>

              <th className="px-4 py-4">Room Number</th>

              <th className="px-4 py-4">Room Type</th>

              <th className="px-4 py-4">Price</th>

              <th className="px-4 py-4">Status</th>

              <th className="px-4 py-4">Action</th>

            </tr>

          </thead>

          <tbody>

            {cleaningRooms.length > 0 ? (

              cleaningRooms.map((room) => (

                <tr
                  key={room._id}
                  className="border-b hover:bg-gray-50 text-center"
                >

                  <td className="px-4 py-4 font-semibold">
                    {room.roomNumber}
                  </td>

                  <td className="px-4 py-4">
                    {room.roomType}
                  </td>

                  <td className="px-4 py-4 text-green-700 font-semibold">
                    Rs. {Number(room.price).toLocaleString("en-PK")}
                  </td>

                  <td className="px-4 py-4">

                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {room.availability}
                    </span>

                  </td>

                  <td className="px-4 py-4">

                    <button
                      onClick={() => {
                        setSelectedRoom(room);
                        setIsModalOpen(true);
                      }}
                      className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition-all duration-300 shadow hover:shadow-lg hover:scale-105"
                    >
                      Mark Clean
                    </button>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="5"
                  className="py-8 text-center text-gray-500"
                >
                  No rooms currently require cleaning.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

      {/* Confirmation Modal */}

      {isModalOpen && (

        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

          <div className="bg-white rounded-xl p-8 w-[420px]">

            <h2 className="text-2xl font-bold mb-4">
              Mark Room Clean
            </h2>

            <p className="text-gray-500 mb-8">
              Are you sure this room has been cleaned and is ready to become available?
            </p>

            <div className="flex justify-end gap-3">

              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedRoom(null);
                }}
                className="bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>

              <button
                onClick={handleMarkClean}
                className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
              >
                Confirm
              </button>

            </div>

          </div>

        </div>

      )}

    </>
  );
}

export default ManageHousekeeping;