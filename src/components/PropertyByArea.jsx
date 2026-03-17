// src/components/PropertyByArea.jsx
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { BedDouble, Bath, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import api from '../services/api';

import "swiper/css";
import "swiper/css/navigation";

const PropertyByArea = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [universities, setUniversities] = useState([]);
  const [featuredListings, setFeaturedListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch universities on component mount
  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await api.get("/campus/list");
        
        if (response?.data?.status === true && response?.data?.data) {
          setUniversities(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching universities:", error);
      }
    };

    fetchUniversities();
  }, []);

  // Fetch all featured listings on component mount (default view)
  useEffect(() => {
    const fetchAllFeaturedListings = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch listings without campus filter to get all featured listings
        const response = await api.get('/listings?per_page=50');
        
        if (response?.data?.status === true) {
          // Filter only featured listings
          const featured = response.data.data.listings.filter(
            listing => listing.is_featured === true
          );
          setFeaturedListings(featured);
        } else {
          setError("Failed to fetch listings");
        }
      } catch (error) {
        console.error("Error fetching listings:", error);
        setError(error?.response?.data?.message || "Failed to load listings");
      } finally {
        setLoading(false);
      }
    };

    fetchAllFeaturedListings();
  }, []);

  // Fetch featured listings when a university tab is clicked
  const handleTabClick = async (tabValue) => {
    setActiveTab(tabValue);
    
    if (tabValue === "all") {
      // If "ALL" is clicked, fetch all featured listings again
      setLoading(true);
      try {
        const response = await api.get('/listings?per_page=50');
        
        if (response?.data?.status === true) {
          const featured = response.data.data.listings.filter(
            listing => listing.is_featured === true
          );
          setFeaturedListings(featured);
        }
      } catch (error) {
        console.error("Error fetching listings:", error);
        setError(error?.response?.data?.message || "Failed to load listings");
      } finally {
        setLoading(false);
      }
    } else {
      // Fetch featured listings for specific university
      setLoading(true);
      try {
        const response = await api.get(`/listings?campus_id=${tabValue}&per_page=50`);
        
        if (response?.data?.status === true) {
          const featured = response.data.data.listings.filter(
            listing => listing.is_featured === true
          );
          setFeaturedListings(featured);
        }
      } catch (error) {
        console.error("Error fetching listings:", error);
        setError(error?.response?.data?.message || "Failed to load listings");
      } finally {
        setLoading(false);
      }
    }
  };

  // Format location from campus data
  const formatLocation = (listing) => {
    if (listing.campus?.name) {
      return listing.campus.name;
    }
    return listing.city || 'Location available';
  };

  // Format distance display
  const formatDistance = (listing) => {
    if (listing.distance_from_campus) {
      if (listing.distance_from_campus.label) {
        return listing.distance_from_campus.label;
      }
      if (listing.distance_from_campus.miles) {
        return `${listing.distance_from_campus.miles.toFixed(1)} mi`;
      }
      if (listing.distance_from_campus.km) {
        return `${listing.distance_from_campus.km.toFixed(1)} km`;
      }
    }
    return '';
  };

  // Get image URL
  const getImageUrl = (listing) => {
    return listing.primary_image || "/images/image_not_found.png";
  };

  return (
    <section className="property_by_area">
      <div className="container">

        {/* Heading */}
        <div className="text-center mb-4">
          <h4 className="heading text_blue">
            Paid {" "}
            <span className="text_theme fw-semibold">
              Featured Listings{" "}
            </span>
             By Host
          </h4>
        </div>

        {/* Tabs */}
        {universities.length > 0 ? (
          <ul className="nav nav-tabs justify-content-center flex-wrap mb-4 w-100">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "all" ? "active" : ""}`}
                onClick={() => handleTabClick("all")}
              >
                ALL
              </button>
            </li>

            {universities.map((uni) => (
              <li key={uni.id} className="nav-item">
                <button
                  className={`nav-link ${
                    activeTab === uni.id.toString() ? "active" : ""
                  }`}
                  onClick={() => handleTabClick(uni.id.toString())}
                >
                  {uni.name} {/* Show first word of university name */}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-3">
            <div className="spinner-border spinner-border-sm text_theme" role="status">
              <span className="visually-hidden">Loading universities...</span>
            </div>
              <p className="m-0 text-muted">Loading universities...</p>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text_theme" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading featured listings...</p>
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="text-center py-4">
            <p className="text-danger">{error}</p>
          </div>
        )}

        {/* No featured listings state */}
        {!loading && !error && featuredListings.length === 0 && (
          <div className="text-center py-5">
            <h6 className="text-muted">
              No featured listings available currently
            </h6>
          </div>
        )}

        {/* Listings Slider - Only show featured listings */}
        {!loading && !error && featuredListings.length > 0 && (
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={20}
            breakpoints={{
              0: { slidesPerView: 1 },
              576: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              992: { slidesPerView: 4 },
            }}
          >
            {featuredListings.map((listing) => (
              <SwiperSlide key={listing.id}>
                <div className="listing-card">

                  <Link to={`/property/${listing.slug}`} className="listing-image">
                    {/* Featured tag - always show since these are featured listings */}
                    <span className="featured_tag">
                      FEATURED
                    </span>
                    <img 
                      src={getImageUrl(listing)} 
                      alt={listing.title}
                      onError={(e) => {
                        e.target.src = "/images/image_not_found.png";
                      }}
                    />
                  </Link>

                  <div className="listing-body">
                    <Link to={`/property/${listing.slug}`} >
                    <h6 className="fw-bold text-truncate text_blue text-capitalize">
                      {listing.title}
                    </h6>
                    </Link>

                    {/* Location - Show campus name */}
                    <p className="listing-location text-truncate">
                      <MapPin size={14} /> {formatLocation(listing)}
                    </p>

                    <div className="d-flex gap-3 small mb-2">
                      <span><BedDouble size={14} /> {listing.bedrooms || 0} {listing.bedrooms === 1 ? "Bed" : "Beds"} </span>
                      <span><Bath size={14} /> {listing.bathrooms || 0} {listing.bedrooms === 1 ? "Bath" : "Baths"}</span>
                      <span className="text-capitalize">{formatDistance(listing)}</span>
                    </div>

                    <h5 className="fw-bold text_blue">
                      {listing.price_formatted || `$${parseFloat(listing.price).toFixed(0)}`} <small>/ Month</small>
                    </h5>
                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

      </div>
    </section>
  );
};

export default PropertyByArea;