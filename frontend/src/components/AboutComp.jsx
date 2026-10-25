import roomImage from "../assets/images/about-us-01.jpg";
import aboutImage from "../assets/images/about-us-02.jpg";

function AboutComp() {
  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* ================= LEFT ================= */}

          <div data-aos="fade-left">
            <p className="uppercase tracking-[4px] sm:tracking-[6px] text-amber-600 font-semibold mb-4">
              About Us
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-7 sm:mb-8 font-serif">
              Tailored Services &
              <br className="hidden sm:block" /> Luxury Experiences
            </h2>

            <p className="text-gray-600 text-base sm:text-lg leading-8 sm:leading-9 mb-6 sm:mb-7">
              At LuxuryStay Hotel, every guest is welcomed with elegance,
              comfort, and personalized hospitality. Our mission is to create
              memorable experiences whether you're traveling for business or
              leisure.
            </p>

            <p className="text-gray-600 text-base sm:text-lg leading-8 sm:leading-9 mb-8 sm:mb-10">
              From luxurious rooms to premium facilities, every detail is
              carefully designed to provide comfort beyond expectations.
            </p>

            <h3 className="italic text-base sm:text-lg text-amber-700">
              — LuxuryStay Management
            </h3>
          </div>

          {/* ================= RIGHT IMAGES  ================= */}

          <div
            className="relative w-full max-w-xl mx-auto lg:max-w-none"
            data-aos="fade-right"
          >
            {/* MAIN IMAGE */}

            <img
              src={roomImage}
              alt="Luxury Room"
              className="w-full h-auto rounded-3xl shadow-2xl transition duration-700 hover:scale-105"
            />

            {/* SECOND IMAGE */}

            <img
              src={aboutImage}
              alt="Luxury Hotel"
              className="
                absolute
                -bottom-8
                -left-3
                sm:-left-8
                lg:-left-14
                w-52
                sm:w-64
                lg:w-72
                max-w-[65%]
                rounded-3xl
                border-4
                sm:border-8
                border-white
                shadow-2xl
                transition
                duration-700
                hover:-translate-y-3
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutComp;
