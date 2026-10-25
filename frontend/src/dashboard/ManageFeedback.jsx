import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
function ManageFeedback() {
  // import STATES
  const [feedback, setFeedback] = useState([]);

  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const [isEditOpen, setIsEditOpen] = useState(false);

  const [formData, setFormData] = useState({
    rating: "",
    satisfied: false,
    recommend: false,
    comment: "",
  });

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // fetching feedback
  const fetchFeedbacks = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/feedback/all-feedback",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setFeedback(response.data.feedback);
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Failed to fetch feedback");
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);
  const handleDeleteFeedback = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/feedback/delete/${selectedFeedback._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Feedback Deleted Successfully");

      setIsDeleteOpen(false);

      fetchFeedbacks();
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Failed to delete feedback");
    }
  };
  const handleUpdateFeedback = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/feedback/update/${selectedFeedback._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Feedback Updated Successfully");

      setIsEditOpen(false);

      setSelectedFeedback(null);

      fetchFeedbacks();
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Failed to update feedback");
    }
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  return (
    <>
      {/* header page */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold uppercase font-serif">
            Customer Feedback
          </h1>

          <p className="text-gray-500">Manage customer reviews and feedback</p>
        </div>

        <div className="bg-white shadow rounded-xl px-9 py-5 text-center">
          <p className="text-gray-500 text-sm">Total Feedback</p>

          <h2 className="text-3xl font-bold text-[#C8A96A]">
            {feedback.length}
          </h2>
        </div>
      </div>

      {/* table for feedback */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full">
          <thead className="bg-[#1B1B1B] text-[#C8A96A]">
            <tr>
              <th className="px-4 py-4">Customer</th>
              <th className="px-4 py-4">Rating</th>
              <th className="px-4 py-4">Satisfied</th>
              <th className="px-4 py-4">Recommend</th>
              <th className="px-4 py-4">Date</th>
              <th className="px-4 py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {feedback.length > 0 ? (
              feedback.map((feedback) => (
                <tr
                  key={feedback._id}
                  className="border-b hover:bg-gray-50 text-center"
                >
                  <td className="px-4 py-4">{feedback.user?.name}</td>

                  <td className="px-4">⭐ {feedback.rating}/5</td>

                  <td className="px-4">
                    {feedback.satisfied ? (
                      <span className="text-green-600 font-semibold">Yes</span>
                    ) : (
                      <span className="text-red-600 font-semibold">No</span>
                    )}
                  </td>

                  <td className="px-4">
                    {feedback.recommend ? (
                      <span className="text-green-600 font-semibold">Yes</span>
                    ) : (
                      <span className="text-red-600 font-semibold">No</span>
                    )}
                  </td>

                  <td className="px-4 whitespace-nowrap">
                    {new Date(feedback.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedFeedback(feedback);

                          setFormData({
                            rating: feedback.rating,
                            satisfied: feedback.satisfied,
                            recommend: feedback.recommend,
                            comment: feedback.comment,
                          });

                          setIsEditOpen(true);
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow hover:shadow-lg hover:scale-105"
                      >
                        Update
                      </button>

                      <button
                        onClick={() => {
                          setSelectedFeedback(feedback);
                          setIsDeleteOpen(true);
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow hover:shadow-lg hover:scale-105"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-8">
                  No Feedback Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* View Feedback Modal */}
      {/* Update Feedback Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white w-[650px] rounded-xl shadow-xl p-8">
            <h2 className="text-3xl font-bold mb-6">Update Feedback</h2>

            <div className="space-y-5">
              <div>
                <label className="block font-semibold mb-2">Rating</label>

                <input
                  type="number"
                  name="rating"
                  min="1"
                  max="5"
                  value={formData.rating}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                />
              </div>

              <div className="flex gap-8">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="satisfied"
                    checked={formData.satisfied}
                    onChange={handleChange}
                  />
                  Satisfied
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="recommend"
                    checked={formData.recommend}
                    onChange={handleChange}
                  />
                  Recommend
                </label>
              </div>

              <div>
                <label className="block font-semibold mb-2">Comment</label>

                <textarea
                  rows="5"
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => {
                  setIsEditOpen(false);
                  setSelectedFeedback(null);
                }}
                className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 "
              >
                Cancel
              </button>

              <button
                onClick={handleUpdateFeedback}
                className="px-6 py-3 bg-[#3c7b11] text-white rounded-lg hover:bg-[#07541a]"
              >
                Update Feedback
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Delete Feedback Modal */}
      {isDeleteOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-[400px] text-center">
            <h2 className="text-2xl font-bold mb-3">Delete Feedback</h2>

            <p className="text-gray-500">
              Are you sure you want to delete this feedback?
            </p>

            <div className="flex justify-center gap-3 mt-6">
              <button
                onClick={() => setIsDeleteOpen(false)}
                className="bg-gray-500 text-white px-5 py-2 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteFeedback}
                className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ManageFeedback;
