import React from 'react'
import { BedDouble, User2Icon } from "lucide-react";

function InvoiceTemplate({invoice}) {
     if (!invoice) return null;
  return (
    <>
      {/* Header */}

            <div className="bg-linear-to-r from-[#6a0707] via-[#2c2c2c] to-[#1B1B1B] rounded-t-2xl px-8 py-8 text-center">
              <h1 className="text-4xl font-extrabold text-[#C8A96A] tracking-widest">
                LUXURY STAY
              </h1>

              <p className="text-white tracking-[8px] mt-2 uppercase"> As unique as your imaginations</p>

              <div className="inline-block mt-5  bg-[#C8A96A] text-[#1B1B1B] px-6 py-2 rounded-full font-bold">
                PAYMENT INVOICE
              </div>
            </div>

            {/* Invoice Info */}

            <div className="bg-[#faf7f2] px-8 py-5 border-b flex justify-between">
              <div>
                <p className="text-gray-500 text-sm">Invoice Number</p>

                <h2 className="text-2xl font-bold">
                  INV-{invoice._id.slice(-6).toUpperCase()}
                </h2>
              </div>

              <div className="text-right">
                <p className="text-gray-500 text-sm">Generated On</p>

                <h2 className="font-semibold">
                  {new Date(invoice.paymentDate).toLocaleDateString()}
                </h2>
              </div>
            </div>

            <div className="p-8">
              {/* Guest & Booking */}

              <div className="grid grid-cols-2 gap-6">
                {/* Guest */}

                <div className="border rounded-xl shadow-sm p-6">
                  <User2Icon size={20} className="text-black" />
                  <h3 className="text-xl font-bold text-[#C8A96A] mb-5 uppercase">
                     Guest Information
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-500 text-sm font-bold">Name</p>

                      <p className="font-semibold">
                        {invoice.guest?.name}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500 text-sm font-bold">Email</p>

                      <p className="font-semibold">
                        {invoice.guest?.email}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500 text-sm font-bold">Phone</p>

                      <p className="font-semibold">
                        {invoice.guest?.contact}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Booking */}

                <div className="border rounded-xl shadow-sm p-6">
                  <BedDouble size={20} className="text-black" />
                  <h3 className="text-xl font-bold text-[#C8A96A] mb-5 uppercase">
                     Booking Details
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-500 text-sm font-bold">Room Number</p>

                      <p className="font-semibold">
                        {invoice.booking?.room?.roomNumber}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500 text-sm font-bold">Room Type</p>

                      <p className="font-semibold">
                        {invoice.booking?.room?.roomType}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500 text-sm font-bold">Payment Method</p>

                      <p className="font-semibold">
                        {invoice.paymentMethod}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500 text-sm font-bold">Status</p>

                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {invoice.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Charges */}

              <div className="mt-10">
                <h3 className="text-2xl font-bold mb-4 text-[#1B1B1B] uppercase">
                  Charges
                </h3>

                <table className="w-full rounded-xl overflow-hidden border shadow-sm">
                  <thead className="bg-[#1B1B1B] text-[#C8A96A]">
                    <tr>
                      <th className="py-4">Description</th>

                      <th className="py-4">Amount</th>
                    </tr>
                  </thead>

                  <tbody>
                    {invoice.items.map((item, index) => (
                      <tr
                        key={index}
                        className="border-b text-center hover:bg-[#faf7f2] transition"
                      >
                        <td className="py-4">{item.description}</td>

                        <td className="py-4 font-semibold text-green-700">
                          Rs. {item.amount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Payment Summary */}

              <div className="flex justify-end mt-10">
                <div className="bg-[#faf7f2] rounded-xl shadow p-6 w-[340px]">
                  <div className="flex justify-between mb-3">
                    <span>Subtotal</span>

                    <span>Rs. {invoice.amount}</span>
                  </div>

                  <div className="flex justify-between mb-3">
                    <span>Tax</span>

                    <span>Rs. 0</span>
                  </div>

                  <hr className="my-6" />

                 <div className="flex justify-between items-center text-2xl font-bold text-[#C8A96A]">
    <span>Grand Total</span>

    <span>
        Rs. {Number(invoice.amount).toLocaleString("en-PK")}
    </span>
</div>

                  <div className="flex justify-between mt-5">
                    <span>Status</span>

                    <span className="text-green-700 font-semibold">
                      {invoice.status}
                    </span>
                  </div>

                  <div className="flex justify-between mt-3">
                    <span>Payment</span>

                    <span className="font-semibold">
                      {invoice.paymentMethod}
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer */}

              <div className="border-t mt-10 pt-8 text-center">
                <h2 className="text-2xl font-bold text-[#C8A96A]">
                  Thank You For Staying With Luxury Stay
                </h2>

                <p className="text-gray-500 mt-2">
                  We appreciate your visit and hope to welcome you again.
                </p>

                <div className="mt-5 space-y-1 text-sm text-gray-500">
                  <p> Karachi, Pakistan</p>

                  <p>luxurystay@gmail.com</p>

                  <p> +92 300 2334456</p>
                </div>
              </div>
              </div>
    </>
  )
}

export default InvoiceTemplate
