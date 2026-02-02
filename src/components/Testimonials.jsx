import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <div className="container position-relative">

        {/* Heading */}
        <div className="text-center mb-5">
          <h2 className="fw-bold heading text_dark">
            What <span className="text_theme">Students & Hosts</span> Say
          </h2>
        </div>

        {/* Custom arrows */}
        <div className="testimonial-nav prev">
          <i className="fa-solid fa-chevron-left"></i>
        </div>
        <div className="testimonial-nav next">
          <i className="fa-solid fa-chevron-right"></i>
        </div>

        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{
            prevEl: ".testimonial-nav.prev",
            nextEl: ".testimonial-nav.next",
          }}
          pagination={{ clickable: true }}
          spaceBetween={35}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
          }}
          className="pb-5 px-3"
        >
          {/* STUDENTS */}
          <SwiperSlide>
            <TestimonialCard
              name="Aarav S."
              role="Computer Science Student"
              badge="Student"
              text="Filtering listings by campus made the search simple. Every option felt relevant and close to my university."
              rotate="left"
            />
          </SwiperSlide>

          <SwiperSlide>
            <TestimonialCard
              name="Nina L."
              role="International Graduate Student"
              badge="Student"
              text="I found verified housing near my campus before arriving in the U.S. It saved me a lot of stress."
            />
          </SwiperSlide>

          <SwiperSlide>
            <TestimonialCard
              name="Jordan M."
              role="Business Major"
              badge="Student"
              text="No fake listings or random locations. Everything was clearly approved for my campus."
              rotate="right"
            />
          </SwiperSlide>

          {/* HOSTS */}
          <SwiperSlide>
            <TestimonialCard
              name="Michael R."
              role="Property Owner"
              badge="Host"
              text="Listing my unit was straightforward, and inquiries came only from verified students near campus."
              rotate="left"
            />
          </SwiperSlide>

          <SwiperSlide>
            <TestimonialCard
              name="Priya K."
              role="Multi-Unit Host"
              badge="Host"
              text="The subscription model is fair, and featured listings gave my property great visibility."
              rotate="right"
            />
          </SwiperSlide>

          <SwiperSlide>
            <TestimonialCard
              name="Daniel W."
              role="Property Manager"
              badge="Host"
              text="I like that listings are campus-restricted. It keeps inquiries relevant and saves time."
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

const TestimonialCard = ({ name, role, badge, text, rotate }) => {
  return (
    <div
      className={`testimonial-card 
        ${rotate === "left" ? "rotate-left" : ""} 
        ${rotate === "right" ? "rotate-right" : ""}`}
    >
      {/* <span className={`badge ${badge === "Host" ? "badge-host" : "badge-student"}`}>
        {badge}
      </span> */}
      <h5>{name}</h5>
      <span className="role">{role}</span>
      <p>{text}</p>
    </div>
  );
};

export default Testimonials;
