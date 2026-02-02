// src/components/PropertyByArea.jsx
import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Link, Links } from "react-router-dom";

const PropertyByArea = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [showNav, setShowNav] = useState(true);
  const swiperRef = useRef(null);

  const areas = [

    { id: "Alabama", title: "Alabama University", desc: "Find commercial property in Australia's most populous state", rooms: "8", img: "/images/uni/uni1.png" },

    { id: "Texas", title: "Texas University", desc: "Premium office spaces in Sydney", rooms: "8", img: "/images/uni/uni2.png" },
    
    { id: "Harvard", title: "Harvard University", desc: "Browse commercial real estate in Brisbane", rooms: "8", img: "/images/uni/uni3.png" },  

    { id: "Notre Dame", title: "Notre Dame University", desc: "Find commercial property in Australia's most populous state", rooms: "8", img: "/images/uni/uni4.png" },
    { id: "Michigan", title: "University of Michigan", desc: "Premium office spaces in Sydney", rooms: "8", img: "/images/uni/uni2.png" },
    
    { id: "Penn State", title: "Penn State University", desc: "Browse commercial real estate in Pern State", rooms: "8", img: "/images/uni/uni3.png" },  

    { id: "Florida", title: "University of Florida", desc: "Find commercial property in Australia's most populous state", rooms: "8", img: "/images/uni/uni4.png" },
    { id: "Miami​", title: "University of Miami", desc: "Find commercial property in Australia's most populous state", rooms: "8", img: "/images/uni/uni1.png" },

    

    

   

  ];



  const filteredAreas = activeTab === "all" ? areas : areas.filter((a) => a.id === activeTab);

  const uniqueStateIds = Array.from(new Set(areas.map(a => a.id)));


  // Function to update navigation visibility based on slidesPerView
  const updateNavigation = () => {
    if (!swiperRef.current) return;
    const swiper = swiperRef.current;
    const slidesPerView = swiper.params.slidesPerView;
    setShowNav(filteredAreas.length > slidesPerView);
  };

  useEffect(() => {
    setTimeout(updateNavigation, 100);
  }, [filteredAreas]);

  return (
    <section className="property_by_area">
      <div className="container ">
        <div className="d-flex flex-column align-items-center justify-content-center">
          <h4 className="mb-3 heading ">Explore <span className="text_theme fw-semibold">Universities</span></h4>

          <ul className="nav nav-tabs mb-4">
                <li className="nav-item">
                    <button
                    className={`nav-link ${activeTab === "all" ? "active" : ""}`}
                    onClick={() => setActiveTab("all")}
                    >
                    ALL 
                    </button>
                </li>
                {uniqueStateIds.map((id) => (
                    <li key={id} className="nav-item">
                    <button
                        className={`text-uppercase nav-link ${activeTab === id ? "active" : ""}`}
                        onClick={() => setActiveTab(id)}
                    >
                        {id}
                    </button>
                    </li>
                ))}
          </ul>

        </div>


        <Swiper
          modules={[Navigation]}
          navigation={showNav}
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 1 },
            375: { slidesPerView: 2 },
            576: { slidesPerView: 2},
            768: { slidesPerView: 3 },
            992: { slidesPerView: 4 },
            1200: { slidesPerView: 5 },
            1920: { slidesPerView: 6 },
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            updateNavigation();
            swiper.on("resize", updateNavigation);
          }}
        >
          {filteredAreas.map((a, index) => (
            <SwiperSlide key={index} className="">
              <Link to="#" className="card  border-0 h-100">
                <img
                  src={a.img}
                  alt={a.title}
                  className="rounded-2"
                  style={{ height: 180, objectFit: "cover" }}
                />
                <div className="card-body bg-none px-0 pb-0">
                  <h6 className="fw-bold text-truncate border-bottom pb-2">{a.title}</h6>
                  <div className=" d-flex align-items-center justify-content-between">
                   <h6 className="fw-bold text_blue m-0">{a.rooms} rooms</h6>
                  <span className="text-dark"><small>View all</small></span>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default PropertyByArea;
