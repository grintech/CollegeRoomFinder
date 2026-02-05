import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { MapPin, Home } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";

const ads = [
  {
    id: 1,
    title: "Private Room near UMBC",
    price: "$650 / month",
    location: "2 min walk to campus",
    img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
  },
  {
    id: 2,
    title: "Shared Apartment",
    price: "$480 / month",
    location: "University Blvd",
    img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
  },
  {
    id: 3,
    title: "Student Housing",
    price: "$720 / month",
    location: "UMBC Area",
    img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
  },
  {
    id: 4,
    title: "Fully Furnished Room",
    price: "$600 / month",
    location: "5 min drive",
    img: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4",
  },
];

const SidebarAdSlider = () => {
  return (
    <div className="card mb-4 ad-slider-card">
      <div className="card-body ">
        <h6 className="fw-bold  mb-2">Featured Listings</h6>

        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          speed={800}
          loop={true}
        //   autoplay={{
        //     delay: 0,                
        //     disableOnInteraction: false,
        //     pauseOnMouseEnter: true, 
        //   }}
        //   speed={3000} 
        //   pagination={{ clickable: true }}
          spaceBetween={12}
          slidesPerView={1}
          breakpoints={{
            768: {
                slidesPerView:2
            },
            992: {
                slidesPerView:1
            }
          }}
        >
          {ads.map((ad) => (
            <SwiperSlide key={ad.id}>
              <div className="ad-slide">
                <img src={ad.img} alt={ad.title} />

                <div className="ad-content">
                  <h6 className="mb-1">{ad.title}</h6>
                  <p className="price">{ad.price}</p>

                  <p className="location">
                    <MapPin size={14} /> {ad.location}
                  </p>

                  <button className="blue_btn w-100 mt-2 d-flex align-items-center justify-content-center gap-1">
                    <Home size={14} /> View Listing
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
