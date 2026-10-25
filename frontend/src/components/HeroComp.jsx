import herovideo from "/videos/hotel-view.mp4";

function HeroComp() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}

      <video autoPlay muted loop playsInline className="absolute top-0 left-0 w-full h-full object-cover">
        <source src={herovideo} type="video/mp4" />
      </video>

      {/* Dark Overlay */}

      <div className="absolute inset-0 bg-black/50"></div>

      {/* Hero Content */}

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-6">
        <p className="uppercase tracking-[6px] text-amber-400 mb-5">
          Luxury Hotel Experience
        </p>

        <h1 className="text-3xl md:text-5xl font-bold leading-tight transition">
          AN ELEGANT ESCAPE 
          <br />
         DESIGNED JUST FOR YOU
        </h1>

        <p className="mt-8 text-xl text-gray-200 max-w-2xl">
          Enjoy luxury rooms, world-class hospitality and unforgettable
          memories.
        </p>
      </div>
    </section>
  );
}

export default HeroComp;
