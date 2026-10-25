import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function ManageMaintenance() {
  // importing states
  const [maintenances, setMaintenances] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);

  const [selectedMaintenance, setSelectedMaintenance] = useState(null);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [formData, setFormData] = useState({
    room: "",
    reportedBy: "",
    issue: "",
    status: "Pending",
  });
  // fetch maintainance
  const fetchMaintenances = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/maintenance/all-maintenance",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setMaintenances(response.data.maintenance);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch maintenance",
      );
    }
  };

  const fetchRooms = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/rooms/all-rooms",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setRooms(response.data.rooms);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/users/all-users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setUsers(response.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMaintenances();
    fetchRooms();
    fetchUsers();
  }, []);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleCreateMaintenance = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/maintenance/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Maintenance Request Created Successfully");

      setIsCreateOpen(false);

      setFormData({
        room: "",
        reportedBy: "",
        issue: "",
        status: "Pending",
      });

      fetchMaintenances();
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Failed to create maintenance request",
      );
    }
  };

  const handleUpdateMaintenance = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/maintenance/update/${selectedMaintenance._id}`,
        {
          issue: formData.issue,
          status: formData.status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Maintenance Updated Successfully");

      setIsEditOpen(false);

      setSelectedMaintenance(null);

      setFormData({
        room: "",
        reportedBy: "",
        issue: "",
        status: "Pending",
      });

      fetchMaintenances();
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Failed to update maintenance",
      );
    }
  };
  const handleDeleteMaintenance = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/maintenance/delete/${selectedMaintenance._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Maintenance Deleted Successfully");

      setIsDeleteOpen(false);

      setSelectedMaintenance(null);

      fetchMaintenances();
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Failed to delete maintenance",
      );
    }
  };
  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold uppercase font-serif">
            Maintenance Management
          </h1>

          <p className="text-gray-500">Manage room maintenance requests</p>
        </div>

        <button
          onClick={() => {
            setFormData({
              room: "",
              reportedBy: "",
              issue: "",
              status: "Pending",
            });

            setIsCreateOpen(true);
          }}
          className="bg-[#d0500b] text-white px-5 py-3 rounded-lg hover:bg-[#a1140d] transition-all duration-300 shadow hover:shadow-lg hover:scale-105"
        >
          + Add Maintenance
        </button>
      </div>
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <p className="text-gray-500">Total Maintenance Requests</p>

        <h2 className="text-4xl font-bold text-[#C8A96A] mt-2">
          {maintenances.length}
        </h2>
      </div>
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full">
          <thead className="bg-[#1B1B1B] text-[#C8A96A] uppercase">
            <tr>
              <th className="px-4 py-4">Room</th>

              <th className="px-4 py-4">Reported By</th>

              <th className="px-4 py-4">Issue</th>

              <th className="px-4 py-4">Status</th>

              <th className="px-4 py-4">Created</th>

              <th className="px-4 py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {maintenances.length > 0 ? (
              maintenances.map((maintenance) => (
                <tr
                  key={maintenance._id}
                  className="border-b hover:bg-gray-50 text-center"
                >
                  <td className="px-4 py-4">
                    Room {maintenance.room?.roomNumber}
                  </td>

                  <td className="px-4 py-4">{maintenance.reportedBy?.name}</td>

                  <td className="px-4 py-4 max-w-xs">{maintenance.issue}</td>

                  <td className="px-4 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold
                  ${
                    maintenance.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : maintenance.status === "In Progress"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                  }`}
                    >
                      {maintenance.status}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    {new Date(maintenance.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => {
                          console.log("Update clicked");

                          setSelectedMaintenance(maintenance);

                          setFormData({
                            room: maintenance.room?._id || "",
                            reportedBy: maintenance.reportedBy?._id || "",
                            issue: maintenance.issue || "",
                            status: maintenance.status || "Pending",
                          });

                          setIsEditOpen(true);
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow hover:shadow-lg hover:scale-105"
                      >
                        Update
                      </button>

                      <button
                        onClick={() => {
                          setSelectedMaintenance(maintenance);
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
                <td colSpan="6" className="text-center py-8 text-gray-500">
                  No Maintenance Requests Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Create Maintenance Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-[650px] p-8">
            <h2 className="text-3xl font-bold mb-6 uppercase text-amber-500">
              Add Maintenance Request
            </h2>

            <div className="space-y-5">
              {/* Room */}

              <div>
                <label className="block font-semibold mb-2">Room</label>

                <select
                  name="room"
                  value={formData.room}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                >
                  <option value="">Select Room</option>

                  {rooms.map((room) => (
                    <option key={room._id} value={room._id}>
                      Room {room.roomNumber} ({room.roomType})
                    </option>
                  ))}
                </select>
              </div>

              {/* Reported By */}

              <div>
                <label className="block font-semibold mb-2">Reported By</label>

                <select
                  name="reportedBy"
                  value={formData.reportedBy}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                >
                  <option value="">Select User</option>

                  {users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Issue */}

              <div>
                <label className="block font-semibold mb-2">Issue</label>

                <textarea
                  rows="4"
                  name="issue"
                  value={formData.issue}
                  onChange={handleChange}
                  placeholder="Enter maintenance issue..."
                  className="w-full border rounded-lg p-3 resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => setIsCreateOpen(false)}
                className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>

              <button
                onClick={handleCreateMaintenance}
                className="px-6 py-3 bg-[#d39911] text-white rounded-lg hover:bg-[#b89658]"
              >
                Create Request
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Update Maintenance Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-[650px] p-8">
            <h2 className="text-3xl font-bold mb-6 uppercase">
              Update Maintenance
            </h2>

            <div className="space-y-5">
              {/* Room */}

              <div>
                <label className="block font-semibold mb-2">Room</label>

                <input
                  type="text"
                  value={`Room ${selectedMaintenance?.room?.roomNumber} (${selectedMaintenance?.room?.roomType})`}
                  readOnly
                  className="w-full border rounded-lg p-3 bg-gray-100 cursor-not-allowed"
                />
              </div>

              {/* Reported By */}

              <div>
                <label className="block font-semibold mb-2">Reported By</label>

                <input
                  type="text"
                  value={selectedMaintenance?.reportedBy?.name || ""}
                  readOnly
                  className="w-full border rounded-lg p-3 bg-gray-100 cursor-not-allowed"
                />
              </div>

              {/* Issue */}

              <div>
                <label className="block font-semibold mb-2">Issue</label>

                <textarea
                  rows="4"
                  name="issue"
                  value={formData.issue}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 resize-none"
                />
              </div>

              {/* Status */}

              <div>
                <label className="block font-semibold mb-2">Status</label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => {
                  setIsEditOpen(false);
                  setSelectedMaintenance(null);
                }}
                className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdateMaintenance}
                className="px-6 py-3 bg-[#d99b20] text-white rounded-lg hover:bg-[#b89658]"
              >
                Update Maintenance
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Delete Maintenance Modal */}
      {isDeleteOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-[400px] text-center">
            <h2 className="text-2xl font-bold mb-3">Delete Maintenance</h2>

            <p className="text-gray-500">
              Are you sure you want to delete this maintenance request?
            </p>

            <div className="flex justify-center gap-3 mt-6">
              <button
                onClick={() => {
                  setIsDeleteOpen(false);
                  setSelectedMaintenance(null);
                }}
                className="bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteMaintenance}
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

export default ManageMaintenance;
