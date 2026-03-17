import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { MapPin, Home } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import api from "../services/api";

import "swiper/css";

const FeaturedAdSlider = () => {
  const [featuredListings, setFeaturedListings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFeaturedListings = async () => {
      setLoading(true);

      try {
        const response = await api.get("/listings");

        if (response?.data?.status === true) {

          const featured = response.data.data.listings
            .filter((listing) => listing.is_featured === true)
            .slice(0, 5); // only first 5

          setFeaturedListings(featured);
        }
      } catch (error) {
        console.error("Error fetching featured listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedListings();
  }, []);

  const getImageUrl = (listing) => {
    return listing.primary_image || "/images/image_not_found.png";
  };

  const formatLocation = (listing) => {
    if (listing.campus?.name) return listing.campus.name;
    return listing.city || "Location";
  };

  return (
    <div className="card mb-4 ad-slider-card">
      <div className="card-body">

        <h6 className="fw-bold mb-2">Featured Properties</h6>
        <p className="text-muted small mb-3">
          Top featured listings near campus
        </p>

        {loading && (
          <div className="ad-slide">

            {/* Image Skeleton */}
            <Skeleton height={160} borderRadius={12} width="100%" />

            <div className="ad-content">

                {/* Title */}
                <Skeleton height={18} width="80%" />

                {/* Location */}
                <Skeleton height={14} width="60%" style={{ marginTop: 6 }} />

                {/* Button */}
                <Skeleton height={42} width="100%" borderRadius={50} style={{ marginTop: 10 }} />

            </div>
         </div>
        )}

        {!loading && featuredListings.length > 0 && (
          <Swiper
            modules={[Autoplay]}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            speed={800}
            loop={true}
            spaceBetween={12}
            slidesPerView={1}
            // pagination={{ clickable: true }}
          >
            {featuredListings.map((listing) => (
              <SwiperSlide key={listing.id}>
                <div className="ad-slide">

                  <img
                    src={getImageUrl(listing)}
                    alt={listing.title}
                    onError={(e) => {
                      e.target.src = "/images/image_not_found.png";
                    }}
                  />

                  <div className="ad-content">

                    <h6 className="mb-1 text-truncate text-capitalize">
                      {listing.title}
                    </h6>

                    <p className="small text-muted mt-1">
                      <MapPin size={13} /> {formatLocation(listing)}
                    </p>

                    <Link
                      to={`/property/${listing.slug}`}
                      className="blue_btn w-100 mt-2 d-flex align-items-center justify-content-center gap-1"
                    >
                      <Home size={14} /> View Property
                    </Link>

                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {!loading && featuredListings.length === 0 && (
          <p className="small text-center text_theme m-0 fw-bold">
            No featured properties available!
          </p>
        )}

      </div>
    </div>
  );
};

export default FeaturedAdSlider;