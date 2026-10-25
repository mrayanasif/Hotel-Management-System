import React from "react";
import { CalendarDays, BedDouble, CircleDollarSign } from "lucide-react";

function BookingCard({
  booking,
  setSelectedBooking,
  setShowModal,
  setCheckIn,
  setCheckOut,
  setShowCancelModal,
  setShowFeedbackModal,
}) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition duration-300">
      {/* Header */}

      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl uppercase  font-bold">
            {booking.room.roomType} Room
          </h2>

          <p className="text-gray-500">Room #{booking.room.roomNumber}</p>
        </div>

        <span
          className={`px-4 py-2 rounded-full font-semibold text-sm ${
            booking.bookingStatus === "Pending"
              ? "bg-yellow-100 text-yellow-700"
              : booking.bookingStatus === "Confirmed"
                ? "bg-green-100 text-green-700"
                : booking.bookingStatus === "Completed"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-red-100 text-red-700"
          }`}
        >
          {booking.bookingStatus}
        </span>
      </div>

      {/* Booking Info */}

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <BedDouble className="text-amber-600" />

          <span>{booking.room.roomType}</span>
        </div>

        <div className="flex items-center gap-3">
          <CalendarDays className="text-amber-600" />

          <span>
            {new Date(booking.checkIn).toLocaleDateString()} -{" "}
            {new Date(booking.checkOut).toLocaleDateString()}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <CircleDollarSign className="text-amber-600" />

          <span>Rs. {booking.totalPrice}</span>
        </div>
      </div>

      {/* Buttons */}

      <div className="flex gap-3 mt-8">
        {booking.bookingStatus !== "Completed" && (
          <>
            <button
              onClick={() => {
                setSelectedBooking(booking);
                setCheckIn(booking.checkIn.slice(0, 10));
                setCheckOut(booking.checkOut.slice(0, 10));
                setShowModal(true);
              }}
              className="flex-1 border border-green-600 text-amber-600 hover:bg-green-800 hover:text-white py-3 rounded-xl uppercase"
            >
              Update
            </button>
            <button
              onClick={() => {
                setSelectedBooking(booking);
                setShowCancelModal(true);
              }}
              className="flex-1 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white py-3 rounded-xl uppercase"
            >
              Cancel
            </button>
          </>
        )}

        {booking.bookingStatus === "Completed" && (
          <button
            onClick={() => {
              setSelectedBooking(booking);
              setShowFeedbackModal(true);
            }}
            className="flex-1 bg-amber-600 hover:bg-yellow-700 text-white py-3 rounded-xl uppercase"
          >
            Give Feedback
          </button>
        )}
      </div>
    </div>
  );
}

export default BookingCard;
