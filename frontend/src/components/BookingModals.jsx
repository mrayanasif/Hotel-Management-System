import React from "react";
import { Star } from "lucide-react";

function BookingModals({
  showModal,
  setShowModal,
  showCancelModal,
  setShowCancelModal,
  showFeedbackModal,
  setShowFeedbackModal,
  selectedBooking,
  setSelectedBooking,
  checkIn,
  setCheckIn,
  checkOut,
  setCheckOut,
  updateBooking,
  cancelBooking,
  rating,
  setRating,
  comment,
  setComment,
  satisfied,
  setSatisfied,
  recommend,
  setRecommend,
  submitFeedback,
}) {
  return (
    <>
      {/* Update Modal */}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-3xl w-full max-w-md p-8">
            <h2 className="text-3xl font-bold mb-6">Update Booking</h2>

            <div className="space-y-5">
              <div>
                <label className="block mb-2 font-semibold">Check In</label>

                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full border rounded-xl p-3"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">Check Out</label>

                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full border rounded-xl p-3"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedBooking(null);
                }}
                className="px-6 py-3 rounded-xl border"
              >
                Close
              </button>

              <button
                onClick={updateBooking}
                className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white"
              >
                Update Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* cancelModal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md">
            <h2 className="text-3xl font-bold text-center">Cancel Booking</h2>

            <p className="text-gray-500 text-center mt-4">
              Are you sure you want to cancel this booking?
            </p>

            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={() => {
                  setShowCancelModal(false);
                  setSelectedBooking(null);
                }}
                className="px-6 py-3 border rounded-xl hover:bg-gray-100"
              >
                No
              </button>

              <button
                onClick={cancelBooking}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Feedback Modal */}

      {showFeedbackModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-3xl w-full max-w-lg p-8">
            <h2 className="text-3xl font-bold text-center">Guest Feedback</h2>

            <p className="text-gray-500 text-center mt-2">
              We'd love to hear about your experience.
            </p>

            {/* Rating */}

            <div className="mt-8">
              <label className="block font-semibold mb-3">Rate Your Stay</label>

              <div className="flex gap-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={32}
                    onClick={() => setRating(star)}
                    className={`cursor-pointer transition-all ${
                      rating >= star
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Comment */}

            <div className="mt-6">
              <label className="block font-semibold mb-3">
                Share Your Experience
              </label>

              <textarea
                rows={5}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell us about your stay..."
                className="w-full border rounded-xl p-4 resize-none"
              />
            </div>

            {/* Satisfied */}

            <div className="mt-6">
              <label className="font-semibold">
                Were you satisfied with our service?
              </label>

              <div className="flex gap-8 mt-3">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={satisfied === true}
                    onChange={() => setSatisfied(true)}
                  />
                  Yes
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={satisfied === false}
                    onChange={() => setSatisfied(false)}
                  />
                  No
                </label>
              </div>
            </div>

            {/* Recommend */}

            <div className="mt-6">
              <label className="font-semibold">
                Would you recommend our hotel?
              </label>

              <div className="flex gap-8 mt-3">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={recommend === true}
                    onChange={() => setRecommend(true)}
                  />
                  Yes
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={recommend === false}
                    onChange={() => setRecommend(false)}
                  />
                  No
                </label>
              </div>
            </div>

            {/* Buttons */}

            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() => {
                  setShowFeedbackModal(false);
                  setSelectedBooking(null);
                }}
                className="px-6 py-3 rounded-xl border hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={submitFeedback}
                className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BookingModals;
