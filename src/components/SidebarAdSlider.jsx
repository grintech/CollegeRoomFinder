import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { MapPin, Home } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";

const sponsors = [
  {
    id: 1,
    name: "SparkleClean Services",
    category: "Cleaning",
    tagline: "Affordable student apartment cleaning",
    img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
  },
 {
  id: 2,
  name: "MoveIt Student Movers",
  category: "Moving",
  tagline: "Fast & safe campus moves",
  img: "https://media.istockphoto.com/id/1030228196/photo/beautiful-young-woman-texting-while-moving-to-new-apartment.webp?a=1&b=1&s=612x612&w=0&k=20&c=cA36Vw0ld9f1BbKdZBCdo6OiI1eR_-g3yTuA-pOg_AU=",
},
  {
    id: 3,
    name: "FurniGo Rentals",
    category: "Furnish",
    tagline: "Beds, desks & sofas for students",
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "CampusEats",
    category: "Food Delivery",
    tagline: "Late-night meals near campus",
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
  },
];


const SidebarAdSlider = () => {
  return (
  <div className="card mb-4 ad-slider-card">
      <div className="card-body">
        <h6 className="fw-bold mb-2">Featured Sponsors</h6>
        <p className="text-muted small mb-3">
          Trusted services for students
        </p>

        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          speed={800}
          loop={true}
          spaceBetween={12}
          slidesPerView={1}
        >
          {sponsors.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="ad-slide">
                <img src={item.img} alt={item.name} />

                <div className="ad-content">
                  <h6 className="mb-1">{item.name}</h6>

                  {/* <span className="badge bg-light text-dark mb-1">
                    {item.category}
                  </span> */}

                  <p className="small text-muted mt-1">
                    {item.tagline}
                  </p>

                  <button className="blue_btn w-100 mt-2 d-flex align-items-center justify-content-center gap-1">
                    <Home size={14} /> View Sponsor
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SidebarAdSlider;
