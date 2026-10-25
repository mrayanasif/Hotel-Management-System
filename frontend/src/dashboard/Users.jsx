import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

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

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()),
  );

  // Temporary function
  const openEditModal = (user) => {
    setSelectedUser(user);
    setIsEditOpen(true);

    console.log("Edit User:", user);
  };

  // Temporary function
  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setIsDeleteOpen(true);

    console.log("Delete User:", user);
  };
  // update modal
  const updateUser = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/users/update/${selectedUser._id}`,
        selectedUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("User details updated successfully.");

      setIsEditOpen(false);

      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };
  const deleteUser = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/users/delete/${selectedUser._id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("User Removed Successfully!");

      setIsDeleteOpen(false);

      fetchUsers();
    } catch (error) {
      console.log(error);

      toast.error("Failed to delete user.");
    }
  };
  return (
    <>
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-8 font-serif uppercase">
          Users Management
        </h1>

        <div className="flex justify-between items-center mb-8">
          {/* Left Side */}

          <div>
            <input
              type="text"
              placeholder="Search User"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-2 border-gray-300 rounded-xl px-4 py-3 w-100 focus:outline-none focus:border-[#C8A96A] "
            />
          </div>

          {/* Right Side */}

          <div className="flex items-center gap-4">
            <div className="bg-white shadow-md rounded-xl px-5 py-3">
              <p className="text-gray-500 text-sm">Total Users</p>

              <h2 className="text-2xl font-bold">{users.length}</h2>
            </div>

            <button
              onClick={() => navigate("/register")}
              className="flex items-center gap-2 bg-[#28d325] hover:bg-[#08650a] text-white px-5 py-3 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              <UserPlus size={20} />
              Add User
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#1B1B1B] text-[#C8A96A] uppercase">
              <tr>
                <th className="py-4 px-6 text-center">Name</th>

                <th className="py-4 px-6 text-center">Email</th>

                <th className="py-4 px-6 text-center">Contact</th>

                <th className="py-4 px-6 text-center">Role</th>

                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user._id}
                  className="border-b hover:bg-gray-50 transition duration-300"
                >
                  <td className="py-4 px-6 text-center font-medium">
                    {user.name}
                  </td>

                  <td className="py-4 px-6 text-center">{user.email}</td>

                  <td className="py-4 px-6 text-center">
                    {user.contact || user.phone || "N/A"}
                  </td>

                  <td className="py-4 px-6 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm uppercase font-extrabold ${
                        user.role === "admin"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="py-4 px-6">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => openEditModal(user)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow hover:shadow-lg hover:scale-105"
                      >
                        Update
                      </button>

                      <button
                        onClick={() => openDeleteModal(user)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow hover:shadow-lg hover:scale-105"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}

      {isEditOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white w-[500px] rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-6">Edit User</h2>

            <div className="space-y-4">
              <label>Full Name</label>
              <input
                type="text"
                value={selectedUser?.name || ""}
                className="w-full border rounded-lg p-3"
                placeholder="Name"
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    name: e.target.value,
                  })
                }
              />
              <label>Email Address</label>
              <input
                type="email"
                value={selectedUser?.email || ""}
                className="w-full border rounded-lg p-3"
                placeholder="Email"
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    email: e.target.value,
                  })
                }
              />
              <label>Contact Number</label>
              <input
                type="text"
                value={selectedUser?.contact || ""}
                className="w-full border rounded-lg p-3"
                placeholder="Phone"
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    contact: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsEditOpen(false)}
                className="bg-gray-300 px-5 py-2 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={updateUser}
                className="bg-green-600 hover:bg-green-800 text-white px-4 py-2 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}

      {isDeleteOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white w-[400px] rounded-xl p-6">
            <h2 className="text-2xl font-bold text-red-600">Delete User</h2>

            <p className="my-6">
              Are you sure you want to remove this user
              <span className="font-bold"> {selectedUser?.name}</span>?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsDeleteOpen(false)}
                className="bg-gray-300 px-5 py-2 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={deleteUser}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition-all duration-300 shadow hover:shadow-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Users;
