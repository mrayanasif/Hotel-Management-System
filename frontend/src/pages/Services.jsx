import React, { useEffect, useState } from "react";
import api from "../api/axios";

import ServiceCard from "../components/ServiceCard";

import serviceBanner from "../assets/images/service-banner.jpg";

function Services() {
  const [services, setServices] = useState([]);
  const fetchServices = async () => {
    try {
      const response = await api.get("/hotelservice/all-services");

      console.log(response.data);

      setServices(response.data.services);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchServices();
  }, []);
  return (
    <>
      <section className="relative h-[80vh]">
        <img
          src={serviceBanner}
          alt="Service Banner"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50"></div>

        <div className="absolute inset-0 flex flex-col justify-center items-center">
          <h1 className="text-6xl font-bold text-white">
            Our Premium Services
          </h1>

          <p className="text-white mt-4 text-lg">Home / Services</p>
        </div>
      </section>
      <div className="text-center mt-10 mb-20">
        <p className="uppercase tracking-[6px] text-amber-600 font-semibold">
          Premium Services
        </p>

        <h2 className="text-5xl font-bold mt-4">
          Enhance Your Stay With Our Exclusive Services
        </h2>

        <p className="text-gray-600 mt-5 max-w-3xl mx-auto leading-8">
          From relaxing spa treatments to airport transfers and fine dining,
          explore our carefully selected services designed to make your stay
          comfortable, convenient, and truly unforgettable.
        </p>
      </div>
     <section className="pb-24 bg-[#faf8f5]">
  <div className="max-w-7xl mx-auto px-6">
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

      {services.map((service) => (
        <ServiceCard
          key={service._id}
          service={service}
        />
      ))}

    </div>
  </div>
</section>
    </>
  );
}

export default Services;
