import { ArrowRight } from "lucide-react";
import bannerVideo from "/videos/room-banner-video.mp4";
import { NavLink } from "react-router-dom";

function RoomBannerComp() {
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
        <source src={bannerVideo} type="video/mp4" />
      </video>

      {/* Dark Overlay */}

      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}

      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
        <h2 className="text-white text-5xl md:text-7xl font-bold leading-tight max-w-4xl">
          Enjoy Your Every Moment
        </h2>
      </div>
    </section>
  );
}

export default RoomBannerComp;
