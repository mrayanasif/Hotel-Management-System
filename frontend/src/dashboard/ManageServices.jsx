import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
function ManageServices() {
  const [services, setServices] = useState([]);

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [isEditOpen, setIsEditOpen] = useState(false);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [selectedService, setSelectedService] = useState(null);

  const [formData, setFormData] = useState({
    serviceName: "",
    price: "",
    description: "",
  });
  const fetchServices = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/hotelservice/all-services",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setServices(response.data.services);
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Failed to fetch services");
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);
  const handleCreateService = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/hotelservice/add-service",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Service Added Successfully");

      setIsCreateOpen(false);

      fetchServices();

      setFormData({
        serviceName: "",
        price: "",
        description: "",
        icon: "",
      });
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Failed to add service");
    }
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleUpdateService = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/hotelservice/update/${selectedService._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Service Updated Successfully");

      setIsEditOpen(false);

      fetchServices();
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Failed to update service");
    }
  };
  const handleDeleteService = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/hotelservice/delete/${selectedService._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Service Deleted Successfully");

      setIsDeleteOpen(false);

      fetchServices();
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Failed to delete service");
    }
  };
  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold uppercase font-serif">
            Hotel Services
          </h1>

          <p className="text-gray-500">Manage hotel services</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-white shadow rounded-xl px-9 py-5 text-center">
            <p className="text-gray-500 text-sm">Total Services</p>

            <h2 className="text-3xl font-bold text-[#C8A96A]">
              {services.length}
            </h2>
          </div>

          <button
            onClick={() => {
              setFormData({
                serviceName: "",
                price: "",
                description: "",
              });

              setIsCreateOpen(true);
            }}
            className="bg-[#32a116] hover:bg-[#288609] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow hover:shadow-lg hover:scale-105"
          >
            Add Service
          </button>
        </div>
      </div>
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full">
          <thead className="bg-[#1B1B1B] text-[#C8A96A]">
            <tr>
              <th className="px-4 py-4">Service Name</th>

              <th className="px-4 py-4">Price</th>

              <th className="px-4 py-4">Description</th>

              <th className="px-4 py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {services.length > 0 ? (
              services.map((service) => (
                <tr
                  key={service._id}
                  className="border-b text-center hover:bg-gray-50"
                >
                  <td className="px-4 py-4">{service.serviceName}</td>

                  <td className="px-4">
                    Rs. {Number(service.price).toLocaleString("en-PK")}
                  </td>

                  <td className="px-4">{service.description}</td>

                  <td className="px-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedService(service);

                          setFormData({
                            serviceName: service.serviceName,
                            price: service.price,
                            description: service.description,
                            icon: service.icon,
                          });

                          setIsEditOpen(true);
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow hover:shadow-lg hover:scale-105"
                      >
                        Update
                      </button>

                      <button
                        onClick={() => {
                          setSelectedService(service);
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
                <td colSpan="4" className="text-center py-8">
                  No Services Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* create service  */}
      {/* Create Service Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white w-[600px] rounded-xl shadow-xl p-8">
            <h2 className="text-3xl font-bold mb-6">Add Hotel Service</h2>

            <div className="space-y-5">
              {/* Service Name */}
              <div>
                <label className="font-semibold">Service Name</label>

                <input
                  type="text"
                  name="serviceName"
                  value={formData.serviceName}
                  onChange={handleChange}
                  className="w-full mt-2 border rounded-lg p-3"
                  placeholder="Enter service name"
                />
              </div>

              {/* Price */}
              <div>
                <label className="font-semibold">Price</label>

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full mt-2 border rounded-lg p-3"
                  placeholder="Enter price"
                />
              </div>
              <div>
                <label className="font-semibold">Icon</label>

                <select
                  name="icon"
                  value={formData.icon}
                  onChange={handleChange}
                  className="w-full mt-2 border rounded-lg p-3"
                >
                  <option value="">Select Icon</option>

                  <option value="Sparkles">Sparkles</option>
                  <option value="Car">Car</option>
                  <option value="UtensilsCrossed">UtensilsCrossed</option>
                  <option value="Dumbbell">Dumbbell</option>
                  <option value="Waves">Waves</option>
                  <option value="Bell">Bell</option>
                  <option value="Gamepad2">Gamepad2</option>
                </select>
              </div>
              {/* Description */}
              <div>
                <label className="font-semibold">Description</label>

                <textarea
                  rows="4"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full mt-2 border rounded-lg p-3"
                  placeholder="Enter description"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() => setIsCreateOpen(false)}
                className="px-6 py-3 bg-gray-500 text-white rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleCreateService}
                className="px-6 py-3 bg-[#C8A96A] text-white rounded-lg hover:bg-[#b89658]"
              >
                Add Service
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update modal */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white w-[600px] rounded-xl shadow-xl p-8">
            <h2 className="text-3xl font-bold mb-6">Update Service</h2>

            <div className="space-y-5">
              <div>
                <label className="font-semibold">Service Name</label>

                <input
                  type="text"
                  name="serviceName"
                  value={formData.serviceName}
                  onChange={handleChange}
                  className="w-full mt-2 border rounded-lg p-3"
                />
              </div>

              <div>
                <label className="font-semibold">Price</label>

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full mt-2 border rounded-lg p-3"
                />
              </div>

              <div>
                <label className="font-semibold">Icon</label>

                <select
                  name="icon"
                  value={formData.icon}
                  onChange={handleChange}
                  className="w-full mt-2 border rounded-lg p-3"
                >
                  <option value="Sparkles">Sparkles</option>
                  <option value="Car">Car</option>
                  <option value="UtensilsCrossed">UtensilsCrossed</option>
                  <option value="Dumbbell">Dumbbell</option>
                  <option value="Waves">Waves</option>
                  <option value="Bell">Bell</option>
                  <option value="Gamepad2">Gamepad2</option>
                </select>
              </div>

              <div>
                <label className="font-semibold">Description</label>

                <textarea
                  rows="4"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full mt-2 border rounded-lg p-3"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() => setIsEditOpen(false)}
                className="px-6 py-3 bg-gray-500 text-white rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdateService}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Update Service
              </button>
            </div>
          </div>
        </div>
      )}
      {/* delete modal */}
      {isDeleteOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-[400px] text-center">
            <h2 className="text-2xl font-bold mb-3">Delete Service</h2>

            <p className="text-gray-500">
              Are you sure you want to delete this service?
            </p>

            <div className="flex justify-center gap-3 mt-6">
              <button
                onClick={() => setIsDeleteOpen(false)}
                className="bg-gray-400 text-white px-5 py-2 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteService}
                className="bg-red-600 text-white px-5 py-2 rounded-lg"
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

export default ManageServices;
