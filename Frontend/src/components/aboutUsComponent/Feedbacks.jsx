import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Vihan Jayasinghe",
    role: "CEO, TechCorp",
    image: "/vihan.jpg",
    text: "This product has completely changed the way we do business. love it!",
  },
  {
    name: "Harindu Munasinghe",
    role: "Marketing Director",
    image: "/haridu.jpg",
    text: "A fantastic experience! The user interface is intuitive and well-designed.",
  },
  {
    name: "Kavindu Lakshan  ",
    role: "Software Engineer",
    image: "/kavidu.jpg",
    text: "The best investment we've made this year. It saved us so time and effort!",
  },
];

const Feedbacks = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <section id="testimonials" className="relative py-25">
      {/* Particles Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: "transparent" },
          particles: {
            number: { value: 40 },
            color: { value: "#fbbf24" },
            shape: { type: "circle" },
            opacity: { value: 0.4, random: true },
            size: { value: 3, random: true },
            move: { enable: true, speed: 1, direction: "none", random: true },
          },
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" } },
          },
        }}
        className="absolute inset-0 z-0"
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
        >
          What Our Clients Say
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-lg text-gray-600 mb-12"
        >
          Hear from our satisfied customers who have experienced our outstanding services.
        </motion.p>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          pagination={{ clickable: true, dynamicBullets: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          className="w-full"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.2 }}
                className="bg-white p-8 rounded-3xl shadow-xl max-w-2xl mx-auto transform transition duration-300 hover:scale-[1.02]"
              >
                <div className="flex flex-col items-center text-center">
                  {/* Image */}
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-amber-500 shadow-md"
                  />
                  {/* Quote */}
                  <p className="text-gray-700 text-lg italic leading-relaxed mb-4">
                    "{testimonial.text}"
                  </p>
                  {/* Name & Role */}
                  <h4 className="text-xl font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Feedbacks;
