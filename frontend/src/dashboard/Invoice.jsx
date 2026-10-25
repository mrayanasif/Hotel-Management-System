import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import api from "../utils/helper";
import { useReactToPrint } from "react-to-print";
import InvoiceTemplate from "../components/InvoiceTemplate";

function Invoice() {
  const invoiceRef = useRef(null);

  const [invoices, setInvoices] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const [isViewOpen, setIsViewOpen] = useState(false);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchInvoices();
    fetchUsers();
  }, []);

  // calling invoice from db

  const fetchInvoices = async () => {
    try {
      const response = await axios.get(`${api}/invoice/all-invoices`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setInvoices(response.data.invoices);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch invoices");
    }
  };
  // calling users from db
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${api}/users/all-users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(response.data.users);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch users");
    }
  };

  const filteredInvoices = selectedUser
    ? invoices.filter((invoice) => invoice.guest?._id === selectedUser)
    : invoices;
  const handleDeleteInvoice = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${api}/invoice/delete/${selectedInvoice._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Invoice Removed Successfully");

      setIsDeleteOpen(false);

      fetchInvoices();
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Failed To Remove Invoice");
    }
  };
  // printing invoice

  const handlePrint = useReactToPrint({
    contentRef: invoiceRef,
    documentTitle: `Invoice-${selectedInvoice?._id?.slice(-6).toUpperCase()}`,
  });
  return (
    <>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 font-serif uppercase">
          Invoice Management
        </h1>

        <div className="mb-6">
          <select
            className="border rounded-lg px-4 py-2 w-72 w-full"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="">All Guest</option>

            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full">
            <thead className="bg-[#1B1B1B] text-[#C8A96A] uppercase">
              <tr>
                <th className="px-4 py-3 text-left">Invoice ID</th>
                <th className="px-4 py-3 text-left">Guest</th>
                <th className="px-4 py-3 text-left">Room</th>
                <th className="px-4 py-3 text-left">Amount</th>
                <th className="px-4 py-3 text-left">Payment</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredInvoices.length > 0 ? (
                filteredInvoices.map((invoice) => (
                  <tr key={invoice._id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3">
                      INV-{invoice._id.slice(-5).toUpperCase()}
                    </td>

                    <td className="px-4 py-3">{invoice.guest?.name}</td>

                    <td className="px-4 py-3">
                      {invoice.booking?.room?.roomNumber}
                    </td>

                    <td className="px-4 py-3">Rs. {invoice.amount}</td>

                    <td className="px-4 py-3">{invoice.paymentMethod}</td>

                    <td className="px-4 py-3">{invoice.status}</td>

                    <td className="px-4 py-3">
                      {new Date(invoice.paymentDate).toLocaleDateString()}
                    </td>

                    <td className="px-4 py-3 flex gap-2 justify-center">
                      <button
                        onClick={() => {
                          setSelectedInvoice(invoice);
                          setIsViewOpen(true);
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow hover:shadow-lg hover:scale-105"
                      >
                        View
                      </button>

                      <button
                        onClick={() => {
                          setSelectedInvoice(invoice);
                          setIsDeleteOpen(true);
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow hover:shadow-lg hover:scale-105"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-6">
                    No Invoices Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Invoice Modal */}
      {isViewOpen && selectedInvoice && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-[950px] max-h-[92vh] overflow-y-auto">
            <InvoiceTemplate invoice={selectedInvoice} />

            <div className="flex justify-end gap-4 mt-10 p-8">
              <button
                onClick={handlePrint}
                className="bg-[#731717] text-white px-6 py-3 rounded-lg transition-all duration-300 shadow hover:shadow-lg hover:scale-105"
              >
                Print
              </button>

              <button
                onClick={() => setIsViewOpen(false)}
                className="bg-black text-white px-6 py-3 rounded-lg transition-all duration-300 shadow hover:shadow-lg hover:scale-105"
              >
                Close
              </button>
              <div className="hidden">
                <div ref={invoiceRef}>
                  <InvoiceTemplate invoice={selectedInvoice} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Invoice;
