import React from "react";
import { Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
function TestimonialComp() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20" data-aos="fade-up">
          <p className="uppercase tracking-[6px] text-amber-600 font-semibold">
            Testimonials
          </p>

          <h2 className="text-5xl font-bold text-gray-900 mt-4">
            What Our Guests Say
          </h2>

          <p className="text-gray-600 mt-5 max-w-2xl mx-auto">
            Hear what our valued guests have to say about their unforgettable
            experience at LuxuryStay Hotel.
          </p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={3}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {/* Card 1 */}

          <SwiperSlide>
            <div className="bg-[#faf8f5] rounded-3xl p-8 shadow h-full">
              <div className="flex mb-5 text-amber-500">
                <Star fill="currentColor" />
                <Star fill="currentColor" />
                <Star fill="currentColor" />
                <Star fill="currentColor" />
                <Star fill="currentColor" />
              </div>

              <p className="text-gray-600 leading-8 mb-8 italic">
                "The rooms were exceptionally clean, luxurious and beautifully
                designed. The staff made our stay truly memorable."
              </p>

              <h3 className="font-bold text-xl">Ahmed Khan</h3>

              <p className="text-gray-500">Business Traveler</p>
            </div>
          </SwiperSlide>

          {/* Card 2 */}

          <SwiperSlide>
            <div className="bg-[#faf8f5] rounded-3xl p-8 shadow h-full">
              <div className="flex mb-5 text-amber-500">
                <Star fill="currentColor" />
                <Star fill="currentColor" />
                <Star fill="currentColor" />
                <Star fill="currentColor" />
                <Star fill="currentColor" />
              </div>

              <p className="text-gray-600 leading-8 mb-8 italic">
                "Everything from the food to the hospitality exceeded our
                expectations. Highly recommended!"
              </p>

              <h3 className="font-bold text-xl">Sarah Ali</h3>

              <p className="text-gray-500">Family Vacation</p>
            </div>
          </SwiperSlide>

          {/* Card 3 */}

          <SwiperSlide>
            <div className="bg-[#faf8f5] rounded-3xl p-8 shadow h-full">
              <div className="flex mb-5 text-amber-500">
                <Star fill="currentColor" />
                <Star fill="currentColor" />
                <Star fill="currentColor" />
                <Star fill="currentColor" />
                <Star fill="currentColor" />
              </div>

              <p className="text-gray-600 leading-8 mb-8 italic">
                "Beautiful rooms, premium facilities and outstanding customer
                service. We'll definitely come back again."
              </p>

              <h3 className="font-bold text-xl">Fatima Noor</h3>

              <p className="text-gray-500">Couple Stay</p>
            </div>
          </SwiperSlide>

          {/* Card 4 */}

          <SwiperSlide>
            <div className="bg-[#faf8f5] rounded-3xl p-8 shadow h-full">
              <div className="flex mb-5 text-amber-500">
                <Star fill="currentColor" />
                <Star fill="currentColor" />
                <Star fill="currentColor" />
                <Star fill="currentColor" />
                <Star fill="currentColor" />
              </div>

              <p className="text-gray-600 leading-8 mb-8 italic">
                "One of the best luxury hotels we have ever stayed in. The
                hospitality, cleanliness and atmosphere were outstanding."
              </p>

              <h3 className="font-bold text-xl">Ali Raza</h3>

              <p className="text-gray-500">Vacation Traveler</p>
            </div>
          </SwiperSlide>

          {/* Card 5 */}

          <SwiperSlide>
            <div className="bg-[#faf8f5] rounded-3xl p-8 shadow h-full">
              <div className="flex mb-5 text-amber-500">
                <Star fill="currentColor" />
                <Star fill="currentColor" />
                <Star fill="currentColor" />
                <Star fill="currentColor" />
                <Star fill="currentColor" />
              </div>

              <p className="text-gray-600 leading-8 mb-8 italic">
                "One of the best luxury hotels we have ever stayed in. The
                hospitality, cleanliness and atmosphere were outstanding."
              </p>

              <h3 className="font-bold text-xl">Saif</h3>

              <p className="text-gray-500">Vacation Traveler</p>
            </div>
          </SwiperSlide>

          {/* Card 6 */}

          <SwiperSlide>
            <div className="bg-[#faf8f5] rounded-3xl p-8 shadow h-full">
              <div className="flex mb-5 text-amber-500">
                <Star fill="currentColor" />
                <Star fill="currentColor" />
                <Star fill="currentColor" />
                <Star fill="currentColor" />
                <Star fill="currentColor" />
              </div>

              <p className="text-gray-600 leading-8 mb-8 italic">
                "One of the best hotels we have ever stayed in."
              </p>

              <h3 className="font-bold text-xl">Noman</h3>

              <p className="text-gray-500"> Tourist</p>
            </div>
          </SwiperSlide>

          {/* Card 7 */}

          <SwiperSlide>
            <div className="bg-[#faf8f5] rounded-3xl p-8 shadow h-full">
              <div className="flex mb-5 text-amber-500">
                <Star fill="currentColor" />
                <Star fill="currentColor" />
                <Star fill="currentColor" />
                <Star fill="currentColor" />
                <Star fill="currentColor" />
              </div>

              <p className="text-gray-600 leading-8 mb-8 italic">
                "One of the best luxury hotels we have ever stayed in. The
                hospitality, cleanliness and atmosphere were outstanding."
              </p>

              <h3 className="font-bold text-xl">Hamdan</h3>

              <p className="text-gray-500">Vacation Traveler</p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}

export default TestimonialComp;
