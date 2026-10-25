import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Staff() {
  // ==============================
  // States
  // ==============================

  const [staff, setStaff] = useState([]);

  const [selectedStaff, setSelectedStaff] = useState(null);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    role: "",
    salary: "",
    address: "",
    status: "Active",
  });

  // ==============================
  // Fetch Staff
  // ==============================

  const fetchStaff = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/staff/all-staff",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setStaff(response.data.staff);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch staff");
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  // ==============================
  // Handle Change
  // ==============================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ==============================
  // Create Staff
  // ==============================

  const handleCreateStaff = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/staff/create-staff",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Staff Created Successfully");

      setIsCreateOpen(false);

      setFormData({
        name: "",
        email: "",
        contact: "",
        role: "",
        salary: "",
        address: "",
        status: "Active",
      });

      fetchStaff();
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Failed to create staff");
    }
  };

  // ==============================
  // Update Staff
  // ==============================

  const handleUpdateStaff = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/staff/update-staff/${selectedStaff._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Staff Updated Successfully");

      setIsEditOpen(false);

      setSelectedStaff(null);

      setFormData({
        name: "",
        email: "",
        contact: "",
        role: "",
        salary: "",
        address: "",
        status: "Active",
      });

      fetchStaff();
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Failed to update staff");
    }
  };

  // ==============================
  // Delete Staff
  // ==============================

  const handleDeleteStaff = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/staff/delete-staff/${selectedStaff._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Staff Deleted Successfully");

      setIsDeleteOpen(false);

      setSelectedStaff(null);

      fetchStaff();
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Failed to delete staff");
    }
  };

  return (
    <>
      {/* Header */}

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold uppercase font-serif">
            Staff Management
          </h1>

          <p className="text-gray-500">Manage hotel staff members</p>
        </div>

        <button
          onClick={() => {
            setFormData({
              name: "",
              email: "",
              contact: "",
              role: "",
              salary: "",
              address: "",
              status: "Active",
            });

            setIsCreateOpen(true);
          }}
          className="bg-[#d0500b] text-white px-5 py-3 rounded-lg hover:bg-[#a1140d] transition-all duration-300 shadow hover:shadow-lg hover:scale-105"
        >
          + Add Staff
        </button>
      </div>

      {/* Statistics Card */}

      {/* Statistics Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {/* Total Staff */}

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500 font-medium">Total Staff</p>

          <h2 className="text-4xl font-bold text-[#C8A96A] mt-2">
            {staff.length}
          </h2>
        </div>

        {/* Active Staff */}

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500 font-medium">Active Staff</p>

          <h2 className="text-4xl font-bold text-green-600 mt-2">
            {staff.filter((member) => member.status === "Active").length}
          </h2>
        </div>

        {/* Inactive Staff */}

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500 font-medium">Inactive Staff</p>

          <h2 className="text-4xl font-bold text-red-600 mt-2">
            {staff.filter((member) => member.status === "Inactive").length}
          </h2>
        </div>

        {/* Monthly Payroll */}

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500 font-medium">Monthly Payroll</p>

          <h2 className="text-3xl font-bold text-blue-600 mt-2">
            Rs.{" "}
            {staff
              .reduce((total, member) => total + Number(member.salary || 0), 0)
              .toLocaleString("en-PK")}
          </h2>
        </div>
      </div>

      {/* Staff Table */}

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full">
          <thead className="bg-[#1B1B1B] text-[#C8A96A] uppercase">
            <tr>
              <th className="px-4 py-4">Employee ID</th>

              <th className="px-4 py-4">Name</th>

              <th className="px-4 py-4">Email</th>

              <th className="px-4 py-4">Contact</th>

              <th className="px-4 py-4">Role</th>

              <th className="px-4 py-4">Salary</th>

              <th className="px-4 py-4">Status</th>

              <th className="px-4 py-4">Joining Date</th>

              <th className="px-4 py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {staff.length > 0 ? (
              staff.map((member) => (
                <tr
                  key={member._id}
                  className="border-b hover:bg-gray-50 text-center"
                >
                  <td className="px-4 py-4 font-semibold">
                    {member.employeeId}
                  </td>

                  <td className="px-4 py-4">{member.name}</td>

                  <td className="px-4 py-4">{member.email}</td>

                  <td className="px-4 py-4">{member.contact}</td>

                  <td className="px-4 py-4">{member.role}</td>

                  <td className="px-4 py-4 font-semibold text-green-700">
                    Rs. {Number(member.salary).toLocaleString("en-PK")}
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold
                      ${
                        member.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : member.status === "Inactive"
                            ? "bg-red-100 text-red-700"
                            : member.status === "On Leave"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-yellow-300 text-gray-700"
                      }`}
                    >
                      {member.status}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    {new Date(member.joiningDate).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedStaff(member);

                          setFormData({
                            name: member.name,
                            email: member.email,
                            contact: member.contact,
                            role: member.role,
                            salary: member.salary,
                            address: member.address,
                            status: member.status,
                          });

                          setIsEditOpen(true);
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow hover:shadow-lg hover:scale-105"
                      >
                        Update
                      </button>

                      <button
                        onClick={() => {
                          setSelectedStaff(member);

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
                <td colSpan="9" className="text-center py-8 text-gray-500">
                  No Staff Members Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Create Staff Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-[650px] p-8">
            <h2 className="text-3xl font-bold mb-6 uppercase text-amber-500">
              Add Staff Member
            </h2>

            <div className="space-y-5">
              {/* Name */}

              <div>
                <label className="block font-semibold mb-2">Full Name</label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Staff Name"
                  className="w-full border rounded-lg p-3"
                />
              </div>

              {/* Email */}

              <div>
                <label className="block font-semibold mb-2">Email</label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email"
                  className="w-full border rounded-lg p-3"
                />
              </div>

              {/* Contact */}

              <div>
                <label className="block font-semibold mb-2">Contact</label>

                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="03XXXXXXXXX"
                  className="w-full border rounded-lg p-3"
                />
              </div>

              {/* Role */}

              <div>
                <label className="block font-semibold mb-2">Role</label>

                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                >
                  <option value="">Select Role</option>
                  <option value="Manager">Manager</option>
                  <option value="Receptionist">Receptionist</option>
                  <option value="Housekeeping">Housekeeping</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Chef">Chef</option>
                  <option value="Security">Security</option>
                </select>
              </div>

              {/* Salary */}

              <div>
                <label className="block font-semibold mb-2">Salary</label>

                <input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="Enter Monthly Salary"
                  className="w-full border rounded-lg p-3"
                />
              </div>

              {/* Address */}

              <div>
                <label className="block font-semibold mb-2">Address</label>

                <textarea
                  rows="3"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter Address"
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
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="OnLeave">On Leave</option>
                </select>
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
                onClick={handleCreateStaff}
                className="px-6 py-3 bg-[#d99b20] text-white rounded-lg hover:bg-[#b89658]"
              >
                Create Staff
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Update Staff Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-[650px] p-8">
            <h2 className="text-3xl font-bold mb-6 uppercase">Update Staff</h2>

            <div className="space-y-5">
              {/* Employee ID */}

              <div>
                <label className="block font-semibold mb-2">Employee ID</label>

                <input
                  type="text"
                  value={selectedStaff?.employeeId || ""}
                  readOnly
                  className="w-full border rounded-lg p-3 bg-gray-100 cursor-not-allowed"
                />
              </div>

              {/* Name */}

              <div>
                <label className="block font-semibold mb-2">Full Name</label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                />
              </div>

              {/* Email */}

              <div>
                <label className="block font-semibold mb-2">Email</label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                />
              </div>

              {/* Contact */}

              <div>
                <label className="block font-semibold mb-2">Contact</label>

                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                />
              </div>

              {/* Role */}

              <div>
                <label className="block font-semibold mb-2">Role</label>

                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                >
                  <option value="Manager">Manager</option>
                  <option value="Receptionist">Receptionist</option>
                  <option value="Housekeeping">Housekeeping</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Chef">Chef</option>
                  <option value="Security">Security</option>
                </select>
              </div>

              {/* Salary */}

              <div>
                <label className="block font-semibold mb-2">Salary</label>

                <input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                />
              </div>

              {/* Address */}

              <div>
                <label className="block font-semibold mb-2">Address</label>

                <textarea
                  rows="3"
                  name="address"
                  value={formData.address}
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
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="OnLeave">On Leave</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => {
                  setIsEditOpen(false);
                  setSelectedStaff(null);
                }}
                className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdateStaff}
                className="px-6 py-3 bg-[#d99b20] text-white rounded-lg hover:bg-[#b89658]"
              >
                Update Staff
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Staff Modal */}

      {isDeleteOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-[400px] text-center">
            <h2 className="text-2xl font-bold mb-3">Delete Staff Member</h2>

            <p className="text-gray-500">
              Are you sure you want to delete this staff member?
            </p>

            <div className="flex justify-center gap-3 mt-6">
              <button
                onClick={() => {
                  setIsDeleteOpen(false);
                  setSelectedStaff(null);
                }}
                className="bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteStaff}
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

export default Staff;
