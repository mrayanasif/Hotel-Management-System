import { ArrowRight } from "lucide-react";
import bannervideo from "/videos/banner-01.mp4";
import { NavLink } from "react-router-dom";

function BannerComp() {
  return (
    <section
      className="relative h-150 overflow-hidden group"
      data-aos="zoom-in-up"
      data-aos-offset="500"
      data-aos-duration="800"
    >
      {/* Background Image */}

      {/* Background Video */}

      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={bannervideo} type="video/mp4" />
      </video>

      {/* Dark Overlay */}

      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}

      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
        <p className="uppercase tracking-[6px] text-amber-400 font-semibold mb-4">
          Luxury Experience
        </p>

        <h2 className="text-amber-400 text-5xl md:text-7xl font-bold leading-tight max-w-4xl font-serif">
          Every Stay Becomes
          <br />A Beautiful Memory
        </h2>

        <p className="text-gray-200 mt-8 text-lg max-w-2xl">
          Discover world-class hospitality, elegant rooms, and unforgettable
          moments crafted just for you.
        </p>

        <button className="mt-10 flex items-center gap-2 bg-amber-500 hover:bg-amber-600 transition px-8 py-4 rounded-full text-white font-semibold">
          <NavLink to="/rooms">Explore Rooms</NavLink>
          <ArrowRight size={20} />
        </button>
      </div>
    </section>
  );
}

export default BannerComp;
