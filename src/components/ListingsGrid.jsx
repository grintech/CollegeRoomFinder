import { BedDouble, Bath, MapPin, Calendar, MessageCircle, Heart, Home, ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react";
import ContactHostModal from "./ContactHostModal.jsx";
import BookTourModal from "./BookTourModal.jsx";
import api from '../services/api';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const ListingsGrid = ({ filters }) => {
  const {user , token} = useAuth();
  const [savedListings, setSavedListings] = useState({});
  const [showContact, setShowContact] = useState(false);
  const [activeListing, setActiveListing] = useState(null);
  const [showTour, setShowTour] = useState(false);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [savingId, setSavingId] = useState(null);

  const navigate = useNavigate();

  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 9,
    total: 0,
    from: 0,
    to: 0,
    next_page_url: null,
    prev_page_url: null
  });

  const [currentPage, setCurrentPage] = useState(1);

  // Check user role
  const isStudent = user?.role === 'student';
  const isHostOrAdmin = user?.role === 'host' || user?.role === 'admin';
  const isLoggedIn = !!user;

  useEffect(() => {
    const fetchListings = async () => {
      if (!filters || !filters.campus_id) {
        setListings([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();

        if (filters.campus_id) {
          params.append('campus_id', filters.campus_id);
        }

        if (filters.maxPrice) {
          params.append('max_price', filters.maxPrice);
          params.append('min_price', '100');
        }

        if (filters.leaseDuration && filters.leaseDuration !== '') {
          params.append('lease_duration', filters.leaseDuration);
        }

        params.append('page', currentPage);

        const response = await api.get(`/listings?${params.toString()}`);

        if (response?.data?.status === true) {
          const fetchedListings = response.data.data.listings || [];
          setListings(fetchedListings);
          
          // Initialize saved state from is_saved field in each listing
          const savedState = {};
          fetchedListings.forEach(listing => {
            savedState[listing.id] = listing.is_saved || false;
          });
          setSavedListings(savedState);
          
          if (response.data.data.pagination) {
            setPagination(response.data.data.pagination);
          }
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

    fetchListings();
  }, [filters, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Handle save/unsave functionality
  const handleSaveToggle = async (listingId, e) => {
    e.preventDefault();
    
    // Check if user is logged in
    if (!user) {
      toast.error("Please log in to save listings");
      return;
    }

    // Find the listing
    const listing = listings.find(l => l.id === listingId);
    if (!listing) return;

    setSavingId(listingId);

    try {
      const response = await api.post(
        `/listings/${listing.slug}/save-unsave`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response?.data?.success) {
        setSavedListings(prev => ({
          ...prev,
          [listingId]: response.data.saved
        }));

        if (response.data.saved) {
          toast.success(response.data.message || "Listing saved successfully!");
        } else {
          toast.success(response.data.message || "Listing removed from saved!");
        }
      }
    } catch (error) {
      console.error("Error saving/unsaving listing:", error);
      toast.error(error?.response?.data?.message || "Failed to save listing");
    } finally {
      setSavingId(null);
    }
  };

  // Handle contact button click
  const handleContactClick = (item) => {
    if (!user) {
      toast.error("Please log in to contact the host");
      setTimeout(() => {
      navigate('/login');
    }, 2000);
      return;
    }
    setActiveListing(item);
    setShowContact(true);
  };

  // Handle book tour button click
  const handleBookTourClick = (item) => {
    if (!user) {
      toast.error("Please log in to book a tour");
      setTimeout(() => {
      navigate('/login');
    }, 2000);
      return;
    }
    setActiveListing(item);
    setShowTour(true);
  };

  const formatLocation = (listing) => {
    if (listing.campus?.name) {
      return listing.campus.name;
    }
    if (listing.city && listing.state) {
      return `${listing.city}, ${listing.state}`;
    }
    return listing.city || 'Location available';
  };

  const formatDistance = (listing) => {
    if (listing.distance_from_campus) {
      if (listing.distance_from_campus.label) {
        return listing.distance_from_campus.label;
      }
      if (listing.distance_from_campus.miles) {
        return `${listing.distance_from_campus.miles.toFixed(1)} mi away`;
      }
      if (listing.distance_from_campus.km) {
        return `${listing.distance_from_campus.km.toFixed(1)} km away`;
      }
    }
    return 'N/A';
  };

  const getImageUrl = (listing) => {
    return listing.primary_image || "/images/image_not_found.png";
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({
      top: document.getElementById('listings-section')?.offsetTop - 100 || 0,
      behavior: 'smooth'
    });
  };

  const handleNextPage = () => {
    if (pagination.next_page_url) {
      handlePageChange(pagination.current_page + 1);
    }
  };

  const handlePrevPage = () => {
    if (pagination.prev_page_url) {
      handlePageChange(pagination.current_page - 1);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    const halfVisible = Math.floor(maxVisible / 2);

    let start = Math.max(1, pagination.current_page - halfVisible);
    let end = Math.min(pagination.last_page, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  if (!filters || !filters.campus_id) {
    return null;
  }

  return (
    <>
      <section id="listings-section" className="home_listings">
        <div className="container">
          {!loading && listings.length > 0 && (
            <div className="mb-4">
              <h5 className="text_blue text-center">
                {pagination.total} Room{pagination.total !== 1 && "s"} Available
                {filters.university && (
                  <>
                    {" "} Near <strong>{filters.university}</strong>
                  </>
                )}
                {pagination.total > 0 && (
                  <small className="text-muted d-block mt-1">
                    Showing {pagination.from} - {pagination.to} of {pagination.total} rooms
                  </small>
                )}
              </h5>
            </div>
          )}

          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border text_theme" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Searching for rooms...</p>
            </div>
          )}

          {error && (
              <div className="col-12 rounded-3 shadow-sm text-center bg-white p-4 mb-3">
                  <Home size={40} className="text-danger" />
                  <h6 className="text-center text-danger mt-3 mb-0">
                     {error}
                  </h6>
                </div>
          )}

          <div className="row g-4">
            {!loading && !error && listings.length > 0 ? (
              listings.map((item) => (
                <div className="col-lg-4 col-md-6" key={item.id}>
                  <div className="listing-card">
                    <Link to={`/property/${item.slug}`} className="listing-image">
                    {item.is_featured == true &&  <span class="featured_tag">FEATURED</span> }

                      {/* Show save button for everyone except hosts/admins */}
                      {!isHostOrAdmin && (
                        <button
                          className={`save-btn ${savedListings[item.id] ? "active" : ""} ${savingId === item.id ? 'saving' : ''}`}
                          onClick={(e) => handleSaveToggle(item.id, e)}
                          disabled={savingId === item.id}
                        >
                          {savingId === item.id ? (
                            <div className="spinner-border spinner-border-sm text_blue" role="status">
                              <span className="visually-hidden">Saving...</span>
                            </div>
                          ) : (
                            <Heart
                              size={18}
                              fill={savedListings[item.id] ? "var(--blue)" : "none"}
                              color={savedListings[item.id] ? "var(--blue)" : "#333"}
                            />
                          )}
                        </button>
                      )}

                      <img
                        src={getImageUrl(item)}
                        alt={item.title}
                        onError={(e) => {
                          e.target.src = "/images/image_not_found.png";
                        }}
                      />

                      {item.is_featured && (
                        <span className="featured-badge">Featured</span>
                      )}
                    </Link>

                    <div className="listing-body">
                      <Link to={`/property/${item.slug}`}>
                        <h5 className="text-truncate text-capitalize" >{item.title}</h5>
                      </Link>

                      <p className="listing-location">
                        {formatLocation(item)}
                      </p>

                      <div className="listing-features">
                        <span>
                          <BedDouble size={16} /> {item.bedrooms || 0} Bed
                        </span>
                        <span>
                          <Bath size={16} /> {item.bathrooms || 0} Bath
                        </span>
                        <span className="distance-badge">
                          <MapPin size={16} /> {formatDistance(item)}
                        </span>
                      </div>

                      <div className="listing-price">
                        {item.price_formatted || `$${parseFloat(item.price).toFixed(0)}`} <small>/ month</small>
                      </div>

                      {/* Show action buttons for everyone except hosts/admins */}
                      {!isHostOrAdmin && (
                        <div className="listing-actions">
                          <button
                            className="book-btn"
                            onClick={() => handleBookTourClick(item)}
                          >
                            <Calendar size={16} /> Book Tour
                          </button>

                          <button
                            className="contact-btn"
                            onClick={() => handleContactClick(item)}
                          >
                            <MessageCircle size={16} /> Contact
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              !loading && !error && (
                <div className="col-12 rounded-3 shadow-sm text-center bg-white p-4">
                  <Home size={40} className="text_theme" />
                  <h6 className="text-center text_theme mt-3 mb-0">
                    No rooms match your filters. Try adjusting them above.
                  </h6>
                </div>
              )
            )}
          </div>

          {!loading && listings.length > 0 && pagination.last_page > 1 && (
            <div className="pagination-wrapper mt-5">
              <nav aria-label="Listings pagination">
                <ul className="pagination justify-content-center">

                  <li className={`page-item ${!pagination.prev_page_url ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={handlePrevPage}
                      disabled={!pagination.prev_page_url}
                    >
                      <ChevronLeft size={16} />
                      <span className="d-none d-md-inline ms-1">Previous</span>
                    </button>
                  </li>

                  {getPageNumbers().map(page => (
                    <li key={page} className={`page-item ${pagination.current_page === page ? 'active' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </button>
                    </li>
                  ))}

                  <li className={`page-item ${!pagination.next_page_url ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={handleNextPage}
                      disabled={!pagination.next_page_url}
                    >
                      <span className="d-none d-md-inline me-1">Next</span>
                      <ChevronRight size={16} />
                    </button>
                  </li>

                </ul>
              </nav>

              <div className="text-center text-muted mt-2 d-md-none">
                Page {pagination.current_page} of {pagination.last_page}
              </div>

            </div>
          )}

        </div>
      </section>

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

export default ListingsGrid;