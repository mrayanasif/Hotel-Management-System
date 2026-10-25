import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/axios";
import BookingCard from "../components/BookingCard";
import bookingBanner from "../assets/images/booking.jpg";
import BookingModals from "../components/BookingModals";
function Bookings() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  // adding states
  const [bookings, setBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const [satisfied, setSatisfied] = useState(true);
  const [recommend, setRecommend] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/bookings/my-bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookings(response.data.bookings);
    } catch (error) {
      console.log(error);

      toast.error("Unable To Load Bookings");
    }
  };

  useEffect(() => {
    if (!user) {
      return;
    }

    fetchBookings();
  }, [user]);
  //  update function
  const updateBooking = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/bookings/update/${selectedBooking._id}`,
        {
          checkIn,
          checkOut,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Booking Updated Successfully");

      fetchBookings();

      setShowModal(false);

      setSelectedBooking(null);
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Unable To Update Booking");
    }
  };
  // cancel function
  const cancelBooking = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/bookings/cancel/${selectedBooking._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Booking Cancelled Successfully");

      fetchBookings();

      setShowCancelModal(false);
      setSelectedBooking(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable To Cancel Booking");
    }
  };
  // feedback function
  const submitFeedback = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/feedback/create",
        {
          booking: selectedBooking._id,
          rating,
          comment,
          satisfied,
          recommend,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Feedback Submitted Successfully");

      setShowFeedbackModal(false);
      setSelectedBooking(null);

      setRating(0);
      setComment("");
      setSatisfied(true);
      setRecommend(true);

      fetchBookings();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable To Submit Feedback");
    }
  };
  return (
    <>
      {/* Hero Section*/}

      <section className="relative h-[80vh]">
        <img
          src={bookingBanner}
          className="w-full h-full object-cover"
          alt=""
        />

        <div className="absolute inset-0 bg-black/50"></div>

        <div className="absolute inset-0 flex flex-col justify-center items-center">
          <h1 className="text-6xl font-bold text-white">My Bookings</h1>

          <p className="text-white mt-4">Home / Bookings</p>
        </div>
      </section>

      {/* Main Section*/}

      <section className="py-24 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-16">
            <div>
              <p className="uppercase tracking-[5px] text-amber-600 font-semibold">
                Welcome 
              </p>

              <h2 className="text-5xl uppercase font-bold mt-2">{user?.name}</h2>
            </div>

            <button
              onClick={() => navigate("/CreateBooking")}
              className="px-8 py-4 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-semibold"
            >
             Create Booking
            </button>
          </div>

          {bookings.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-xl p-16 text-center">
              <h2 className="text-4xl font-bold">No Bookings Yet</h2>

              <p className="text-gray-500 mt-5">
                Click Create Booking to reserve your luxury room.
              </p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-8">
              {bookings.map((booking) => (
                <BookingCard
                  booking={booking}
                  setSelectedBooking={setSelectedBooking}
                  setShowModal={setShowModal}
                  setCheckIn={setCheckIn}
                  setCheckOut={setCheckOut}
                  setShowCancelModal={setShowCancelModal}
                  setShowFeedbackModal={setShowFeedbackModal}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <BookingModals
        showModal={showModal}
        setShowModal={setShowModal}
        showCancelModal={showCancelModal}
        setShowCancelModal={setShowCancelModal}
        showFeedbackModal={showFeedbackModal}
        setShowFeedbackModal={setShowFeedbackModal}
        selectedBooking={selectedBooking}
        setSelectedBooking={setSelectedBooking}
        checkIn={checkIn}
        setCheckIn={setCheckIn}
        checkOut={checkOut}
        setCheckOut={setCheckOut}
        updateBooking={updateBooking}
        cancelBooking={cancelBooking}
        rating={rating}
        setRating={setRating}
        comment={comment}
        setComment={setComment}
        satisfied={satisfied}
        setSatisfied={setSatisfied}
        recommend={recommend}
        setRecommend={setRecommend}
        submitFeedback={submitFeedback}
      />
    </>
  );
}

export default Bookings;
