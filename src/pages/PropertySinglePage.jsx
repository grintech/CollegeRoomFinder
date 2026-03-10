import { MapPin, User, Mail, Phone, Bed, Bath, AreaChart, CheckCircle, CarIcon, DumbbellIcon, Shield, UtensilsCrossed, ShirtIcon, PawPrint, Cigarette, Home, Building, HomeIcon, Map, NavigationIcon, Calendar, Heart, Bus, Loader } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { useParams, useLocation } from "react-router-dom";
import toast from 'react-hot-toast';

import CommuteCard from "../components/CommuteCard";
import SidebarAdSlider from "../components/SidebarAdSlider";
import BookTourModal from "../components/BookTourModal";
import ContactHostModal from "../components/ContactHostModal";
import SimilarListings from "../components/SimilarListings";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

// Helper function to format Font Awesome icon classes
const formatIconClass = (iconName) => {
  if (!iconName) return 'fa-solid fa-circle';
  
  // If it already has the proper format, return as is
  if (iconName.startsWith('fa-') || iconName.startsWith('fa-solid')) {
    return iconName;
  }
  
  // Add fa-solid prefix if it's just the icon name (e.g., "tv" -> "fa-solid fa-tv")
  return `fa-solid ${iconName}`;
};

const PropertySinglePage = () => {
  const { slug } = useParams();
  const location = useLocation();
  const { user, token, logout } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [propertyData, setPropertyData] = useState(null);
  
  const [showContact, setShowContact] = useState(false);
  const [showTour, setShowTour] = useState(false);
  const [activeListing, setActiveListing] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const [expanded, setExpanded] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  const textRef = useRef(null);

  // Check if user can save (only students can save)
  const canSave = user && user.role === 'student';

  // Fetch property data based on slug
  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        setLoading(true);
        
        // Make API call with auth token if user is logged in
        const response = await api.get(`/single/listing/${slug}`, {
          headers: token ? {
            'Authorization': `Bearer ${token}`
          } : {}
        });
        
        const result = response.data;
        
        // Check if API request was successful
        if (result?.success === true) {
          // Check if listing data exists
          if (result.data?.listing) {
            setPropertyData(result.data.listing);
            setActiveListing(result.data.listing);
            // Set initial saved state from API response
            setIsSaved(result.data.listing.is_saved === true);
          } else {
            toast.error('Listing data not found in response');
            setError('Listing data not found');
          }
        } else {
          // Handle unsuccessful response
          const errorMessage = result?.message || 'Failed to fetch property details';
          setError(errorMessage);
        }
      } catch (err) {
        console.error('Error fetching property:', err);
        const errorMessage = err.response?.data?.message || err.message || 'An error occurred while fetching property details';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPropertyData();
    }
  }, [slug, token]);

  useEffect(() => {
    if (textRef.current && propertyData?.description) {
      const el = textRef.current;
      setShowToggle(el.scrollHeight > el.clientHeight);
    }
  }, [propertyData?.description]);

  useEffect(() => {
    if (location.state?.openTourModal) {
      setShowTour(true);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  // Save/Unsave toggle function
  const toggleSave = async () => {
    // Check if user is logged in first
    if (!user) {
      toast.error('Please login to save listings');
      return;
    }

    // Double-check if user can save
    if (!canSave) {
      toast.error('Only students can save listings');
      return;
    }

    try {
      setSaving(true);
      
      // Make API call to save/unsave
      const response = await api.post(`/listings/${slug}/save-unsave`);
      
      // Check if response exists and has data
      if (response?.data) {
        // Check if API request was successful
        if (response.data.success === true) {
          // Check if saved state is provided in response
          if (response.data.saved !== undefined) {
            // Update local state based on API response
            setIsSaved(response.data.saved);
            
            // Show success message
            const message = response.data.message || (response.data.saved ? 'Listing saved successfully!' : 'Listing unsaved successfully!');
            toast.success(message);
          } else {
            toast.error('Saved state not found in response');
          }
        } else {
          // Handle unsuccessful response
          const errorMessage = response.data.message || 'Failed to update save status';
          toast.error(errorMessage);
        }
      } else {
        toast.error('Invalid response from server');
      }
    } catch (err) {
      console.error('Error toggling save:', err);
      
      // Handle specific error cases
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (err.response.status === 401) {
          toast.error('Your session has expired. Please login again.');
           setTimeout(() => {
            logout();
            navigate("/login");
            }, 1000);
        } else if (err.response.status === 403) {
          toast.error('You do not have permission to perform this action.');
        } else if (err.response.status === 404) {
          toast.error('Listing not found.');
        } else {
          const errorMessage = err.response.data?.message || 'Failed to update. Please try again.';
          toast.error(errorMessage);
        }
      } else if (err.request) {
        // The request was made but no response was received
        toast.error('Network error. Please check your connection.');
      } else {
        // Something happened in setting up the request that triggered an Error
        toast.error(err.message || 'An error occurred. Please try again.');
      }
    } finally {
      setSaving(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '400px' }}>
          <Home className="text_theme" size={40} />
          <span className="mt-3 text_theme">Loading property details...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !propertyData) {
    return (    
      <div className="min_height container d-flex flex-column align-items-center justify-content-center">
        <div className="text-center bg-white p-4 mb-3">
          <Home size={40} className="text-danger" />
          <h6 className="text-center text-danger mt-3 mb-0">{error || 'Property not found'}</h6>
        </div>
      </div>
    );
  }

  const images = propertyData.images || [];
  const address = propertyData.address || '';
  const encodedAddress = encodeURIComponent(address);
  const amenities = propertyData.amenities || [];

  return (
    <>
      <div className="property_single">
        <div className="container py-5">
          <div className="row g-4">
            <div className="col-lg-8">
              {/* IMAGE GALLERY */}
              {images.length > 0 && (
                <div className="card shadow-sm mb-4">
                  <div className="card-body">
                    <div className="gallery-wrapper mb-2">
                      {/* Property type badge */}
                      <span className="property-type">
                        {propertyData.category?.name || 'Property'}
                      </span>

                      {/* Image counter */}
                      <span className="image-count">
                        {activeIndex + 1} / {images.length}
                      </span>

                      <Swiper
                        modules={[Navigation, Thumbs]}
                        navigation
                        thumbs={{ swiper: thumbsSwiper }}
                        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                        className="main-swiper"
                      >
                        {images.map((img, index) => (
                          <SwiperSlide key={img.id || index}>
                            <img
                              src={img.image_url}
                              alt={img.caption || propertyData.title}
                              onError={(e) => {
                                e.target.src = '/images/image_not_found.png';
                              }}
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>

                    <Swiper
                      onSwiper={setThumbsSwiper}
                      spaceBetween={10}
                      slidesPerView="auto"
                      watchSlidesProgress
                      className="thumb-swiper"
                    >
                      {images.map((img, index) => (
                        <SwiperSlide key={img.id || index} className="thumb-slide">
                          <img
                            src={img.thumbnail_url || img.image_url}
                            alt={`thumb-${index}`}
                            onError={(e) => {
                              e.target.src = '/images/image_not_found.png';
                            }}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
              )}

              {/* ABOUT */}
              <div className="card mb-4">
                <div className="card-body">
                  {/* PROPERTY INFO */}
                  <div className="d-flex justify-content-between flex-wrap mt-4">
                    <div>
                      <h1 className="fw-bold mb-2 text-capitalize">{propertyData.title}</h1>
                      <div className="d-flex align-items-center">
                        <p className="text-muted d-flex align-items-center gap-1 m-0">
                          <MapPin size={16} /> {address}
                        </p>
                        {propertyData.campus && (
                          <span className="badge bg-success-subtle small text-success fw-semibold d-flex align-items-center gap-1 ms-2">
                            <Bus size={14} />
                            {propertyData.campus.name}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-start text-md-end">
                      <h2 className="mb-2">{propertyData.price_formatted || `$${propertyData.price}`}</h2>
                      <p className="m-0">per month</p>
                    </div>

                    {/* Save Button */}
                    {user ? (
                      canSave && (
                        <button
                          className={`save-btn ${isSaved ? "active" : ""}`}
                          onClick={toggleSave}
                          disabled={saving}
                          title={isSaved ? "Remove from saved" : "Save property"}
                        >
                          {saving ? (
                            <Loader size={18} className="spinner text_theme" />
                          ) : (
                            <Heart
                              size={18}
                              fill={isSaved ? "var(--blue)" : "none"}
                              stroke={isSaved ? "var(--blue)" : "#000"}
                            />
                          )}
                        </button>
                      )
                    ) : (
                      <button
                        className="save-btn"
                        onClick={() => toast.error('Please login to save listings')}
                        title="Login to save this property"
                      >
                        <Heart
                          size={18}
                          fill="none"
                          stroke="#000"
                        />
                      </button>
                    )}
                  </div>

                  <div className="d-flex gap-4 my-4 flex-wrap">
                    {propertyData.bedrooms && (
                      <span className="d-flex align-items-start">
                        <Bed size={22} className="me-2" /> {propertyData.bedrooms} Bedrooms
                      </span>
                    )}
                    {propertyData.bathrooms && (
                      <span className="d-flex align-items-start">
                        <Bath size={22} className="me-2" /> {propertyData.bathrooms} Bathrooms
                      </span>
                    )}
                    {propertyData.area_sqft && (
                      <span className="d-flex align-items-start">
                        <AreaChart size={22} className="me-2" /> {propertyData.area_sqft} sq ft
                      </span>
                    )}
                  </div>

                  <h6 className="fw-bold">About this property</h6>

                  <div
                    ref={textRef}
                    className={`text-muted m-0 about-text ${expanded ? "expanded" : ""}`}
                    dangerouslySetInnerHTML={{ __html: propertyData.description || 'No description available' }}
                  />

                  {showToggle && (
                    <button
                      className="read-toggle"
                      onClick={() => setExpanded(!expanded)}
                    >
                      {expanded ? "Read less" : "Read more"}
                    </button>
                  )}
                </div>
              </div>

              {/* AMENITIES */}
              {amenities.length > 0 && (
                <div className="feature_card card mb-4">
                  <div className="card-body">
                    <h6 className="fw-bold mb-3">Amenities & Features</h6>

                    <div className="row g-3">
                      {amenities.map((amenity, i) => (
                        <div className="col-md-4 col-6" key={amenity.id || i}>
                          <div className="amenity-item active">
                            <div className="d-flex align-items-center gap-2">
                              <i className={formatIconClass(amenity.icon)}></i>
                              <span>{amenity.name}</span>
                            </div>
                            <CheckCircle size={18} className="check-icon" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* RENTAL DETAILS */}
              <div className="card mb-4">
                <div className="card-body">
                  <h6 className="fw-bold mb-3">Rental Terms & Details</h6>
                  <div className="col-12 mb-3">
                    <ul className="row list-unstyled mb-0">
                      <div className="col-md-6">
                        <div className="d-flex items-center justify-content-between mb-2">
                          <span className="text-gray-600">Monthly Rent</span>
                          <span className="fw-semibold">{propertyData.price_formatted || `$${propertyData.price}`}</span>
                        </div>
                      </div>
                      {propertyData.security_deposit && (
                        <div className="col-md-6">
                          <div className="d-flex items-center justify-content-between mb-2">
                            <span className="text-gray-600">Security Deposit</span>
                            <span className="fw-semibold">${propertyData.security_deposit}</span>
                          </div>
                        </div>
                      )}
                      {propertyData.lease_duration && (
                        <div className="col-md-6">
                          <div className="d-flex items-center justify-content-between mb-2">
                            <span className="text-gray-600">Lease Term</span>
                            <span className="fw-semibold">
                              {propertyData.lease_duration.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </span>
                          </div>
                        </div>
                      )}
                      <div className="col-md-6">
                        <div className="d-flex items-center justify-content-between mb-2">
                          <span className="text-gray-600">Available</span>
                          <span className="fw-semibold">
                            {propertyData.created_at ? new Date(propertyData.created_at).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            }) : 'Contact for availability'}
                          </span>
                        </div>
                      </div>
                    </ul>
                  </div>

                  {/* Utilities Included */}
                  <div className="col-12">
                    <h6 className="fw-bold">Utilities Included</h6>
                    <p className="text-muted">Contact landlord for utility details</p>
                  </div>
                </div>
              </div>

              {/* PROPERTY POLICIES */}
              <div className="card">
                <div className="card-body">
                  <h6 className="fw-bold mb-3">Property Policies</h6>
                  <div className="row">
                    <div className="col-sm-6">
                      <ul className="list-unstyled mb-0">
                        <div className="d-flex items-center justify-content-between mb-2">
                          <div className="d-flex align-items-baseline gap-2">
                            <span className="text-gray-600"><PawPrint /></span>
                            <div>
                              <span className="fw-semibold">Pet Policy</span>
                              <p className="mt-2">Contact landlord for pet policy</p>
                            </div>
                          </div>
                        </div>
                      </ul>
                    </div>
                    <div className="col-sm-6">
                      <ul className="list-unstyled mb-0">
                        <div className="d-flex items-center justify-content-between mb-2">
                          <div className="d-flex align-items-baseline gap-2">
                            <span className="text-gray-600"><Cigarette /></span>
                            <div>
                              <span className="fw-semibold">Smoking Policy</span>
                              <p className="mt-2">Contact landlord for smoking policy</p>
                            </div>
                          </div>
                        </div>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="col-lg-4">
              {/* OWNER CARD */}
              {propertyData.host && (
                <div className="card mb-4">
                  <div className="card-body">
                    <h6 className="fw-bold mb-4">Property Owner</h6>
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <div className="owner_img">
                        <User />
                      </div>
                      <div>
                        <h6 className="owner_name text-capitalize">{propertyData.host.name}</h6>
                        <p className="m-0">
                          <Building className="me-1" size={16} /> 
                          {propertyData.host.status === 1 ? 'Verified Owner' : 'Individual Owner'}
                        </p>
                      </div>
                    </div>
                    {propertyData.host.member_since && (
                      <p className="text-muted small mb-2">
                        Member since {new Date(propertyData.host.member_since).getFullYear()}
                      </p>
                    )}
                    <p className="mb-1 d-flex align-items-center gap-1">
                      <HomeIcon size={16} className="me-1" /> 1 property listed
                    </p>
                    {propertyData.host.email && (
                      <p className="mb-1 d-flex align-items-center gap-1">
                        <Mail size={16} className="me-1" /> {propertyData.host.email}
                      </p>
                    )}
                    {propertyData.host.phone && (
                      <p className="mb-0 d-flex align-items-center gap-1">
                        <Phone size={16} className="me-1" /> {propertyData.host.phone}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="card mb-4">
                <div className="card-body">
                  <h6 className="fw-bold mb-4">Get in Touch</h6>
                  <div className="d-flex flex-column text-center gap-3">
                    <button
                      className="blue_btn w-100 d-flex justify-content-center align-items-center"
                      onClick={() => {
                        setActiveListing(propertyData);
                        setShowContact(true);
                      }}
                    >
                      <Home className="me-2" size={20} /> Submit Interest
                    </button>

                    <button
                      className="theme_outline_btn w-100 d-flex justify-content-center align-items-center"
                      onClick={() => {
                        setActiveListing(propertyData);
                        setShowTour(true);
                      }}
                    >
                      <Calendar className="me-2" size={20} /> Book Tour
                    </button>

                    <p className="small m-0">Have questions? Message the landlord directly.</p>
                  </div>
                </div>
              </div>

              {/* AD SLIDER */}
              <SidebarAdSlider />

              {/* QUICK FACTS */}
              <div className="card mb-4">
                <div className="card-body">
                  <h6 className="fw-bold mb-4">Quick Facts</h6>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="text-gray-600">Property type</span>
                    <span className="fw-semibold badge text-bg-light">
                      {propertyData.category?.name || 'N/A'}
                    </span>
                  </div>
                  {propertyData.area_sqft && (
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span className="text-gray-600">Square Feet</span>
                      <span className="fw-semibold">{propertyData.area_sqft} sq ft</span>
                    </div>
                  )}
                  {propertyData.bedrooms && (
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span className="text-gray-600">Bedrooms</span>
                      <span className="fw-semibold">{propertyData.bedrooms}</span>
                    </div>
                  )}
                  {propertyData.bathrooms && (
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span className="text-gray-600">Bathrooms</span>
                      <span className="fw-semibold">{propertyData.bathrooms}</span>
                    </div>
                  )}
                  {propertyData.max_guests && (
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span className="text-gray-600">Max Guests</span>
                      <span className="fw-semibold">{propertyData.max_guests}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* LOCATION CARD */}
              {address && (
                <div className="card mb-4 location-card">
                  <div className="card-body">
                    {/* Header */}
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <div className="d-flex align-items-center gap-2">
                        <MapPin size={18} />
                        <h6 className="fw-bold mb-0">Location</h6>
                      </div>

                      <div className="d-flex align-items-center gap-3 small">
                        {propertyData.campus && (
                          <>
                            <span className="badge bg-warning-subtle text_orange text-warning fw-semibold">
                              {propertyData.campus.name}
                            </span>
                            {propertyData.distance_from_campus?.label && (
                              <span className="badge bg-success-subtle text-success fw-semibold d-flex align-items-center gap-1">
                                <Bus size={14} />
                                {propertyData.distance_from_campus.label}
                              </span>
                            )}
                          </>
                        )}
                      </div>
                    </div>

                    {/* Address */}
                    <p className="text-muted small mb-3">{address}</p>

                    {/* Google Map iframe */}
                    <div className="map-wrapper mb-3">
                      <iframe
                        title="property-location"
                        src={`https://www.google.com/maps?q=${encodedAddress}&output=embed`}
                        width="100%"
                        height="220"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>

                    {/* Footer Buttons */}
                    <div className="d-flex gap-2">
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-light w-100 d-flex align-items-center justify-content-center gap-2"
                      >
                        <Map size={16} /> Open in Maps
                      </a>

                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-light w-100 d-flex align-items-center justify-content-center gap-2"
                      >
                        <NavigationIcon size={16} /> Directions
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Commute Card */}
              {propertyData.commute_times && propertyData.campus && (
                <CommuteCard 
                  commuteData={propertyData.commute_times} 
                  campus={propertyData.campus}  
                />
              )}
            </div>
          </div>

          <SimilarListings />
        </div>
      </div>

      {/* Modals */}
      <ContactHostModal
        show={showContact}
        onClose={() => setShowContact(false)}
        listing={activeListing}
      />

      <BookTourModal
        show={showTour}
        onClose={() => setShowTour(false)}
        listing={activeListing}
      />
    </>
  );
};

export default PropertySinglePage;