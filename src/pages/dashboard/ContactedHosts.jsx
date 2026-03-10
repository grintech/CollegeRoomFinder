import { MessageCircle, Calendar, User, Home } from "lucide-react";
import { Link } from "react-router-dom";
import DashSidebar from "./DashSidebar";
import ContactHostModal from "../../components/ContactHostModal";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import api from "../../services/api";
import ContactedHostsSkeleton from "../../components/skeletons/ContactedHostsSkeleton";

const slugify = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
};

const ContactedHosts = () => {
  const { token } = useAuth();
  const [showContact, setShowContact] = useState(false);
  const [activeListing, setActiveListing] = useState(null);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
    from: 0,
    to: 0,
    next_page_url: null,
    prev_page_url: null
  });

  const fetchInquiries = async (page = 1) => {
    try {
      setLoading(true);
      const response = await api.get(`/my-inquiries?page=${page}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.status === true) {
        setInquiries(response.data.data.inquiries);
        if (response.data.data.pagination) {
          setPagination(response.data.data.pagination);
        }
      } else {
        toast.error(response.data.message || 'Failed to fetch inquiries');
      }
    } catch (err) {
      console.error('Error fetching inquiries:', err);
      if (err.response?.status === 401) {
        toast.error('Your session has expired. Please login again.');
      } else {
        toast.error('Failed to load inquiries. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchInquiries(1);
    } else {
      setLoading(false);
      toast.error('Please login to view your inquiries');
    }
  }, [token]);

  const handlePageChange = (page) => {
    fetchInquiries(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case 'replied':
        return 'bg-success';
      case 'open':
        return 'bg-warning text-dark';
      case 'closed':
        return 'bg-secondary';
      default:
        return 'bg-warning text-dark';
    }
  };

  const handleContactAgain = (inquiry) => {
    const listingData = {
      id: inquiry.listing_id,
      title: inquiry.listing.title,
      hostName: inquiry.listing.host.name,
      host_id: inquiry.listing.host_id,
      image: inquiry.listing.primary_image?.image_url || "/images/default-property.jpg"
    };
   
    setShowContact(true);
  };

  const renderPagination = () => {
    if (pagination.last_page <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, pagination.current_page - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(pagination.last_page, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li key={i} className={`page-item ${pagination.current_page === i ? 'active' : ''}`}>
          <button className="page-link" onClick={() => handlePageChange(i)}>
            {i}
          </button>
        </li>
      );
    }

    return (
      <nav aria-label="Inquiries pagination" className="mt-4">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${!pagination.prev_page_url ? 'disabled' : ''}`}>
            <button 
              className="page-link" 
              onClick={() => handlePageChange(pagination.current_page - 1)}
              disabled={!pagination.prev_page_url}
            >
              Previous
            </button>
          </li>
          
          {pages}
          
          <li className={`page-item ${!pagination.next_page_url ? 'disabled' : ''}`}>
            <button 
              className="page-link" 
              onClick={() => handlePageChange(pagination.current_page + 1)}
              disabled={!pagination.next_page_url}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    );
  };

  if (loading && inquiries.length === 0) {
    return (
      <div className="my_account min_height">
        <div className="container py-4">
          <div className="row">
            <h1 className="mb-3 sec-title text-center">Contacted Hosts</h1>
            <div className="col-lg-4 col-xl-3 mb-4 mb-lg-0">
              <DashSidebar />
            </div>
            <div className="col-lg-8 col-xl-9">
              {/* <div className="d-flex justify-content-center align-items-center bg-white p-5 shadow-sm rounded-3">
                <div className="text-center">
                  <i className="fas fa-spinner fa-spin fa-3x text_theme"></i>
                  <p className="mt-3">Loading inquiries...</p>
                </div>
              </div> */}
              <ContactedHostsSkeleton />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="my_account min_height">
        <div className="container py-4">
          <div className="row">
            <h1 className="mb-3 sec-title text-center">
              Contacted Hosts{" "}
              <span className="text_blue">({pagination.total})</span>
            </h1>

            <div className="col-lg-4 col-xl-3 mb-4 mb-lg-0">
              <DashSidebar />
            </div>

            <div className="col-lg-8 col-xl-9">
              <div className="row g-4">
                {inquiries.length > 0 ? (
                  <>
                    {inquiries.map((inquiry) => (
                      <div className="col-12" key={inquiry.id}>
                        <div className="contact-card p-3 shadow-sm rounded-3 bg-white">
                          <div className="row">
                            <div className="col-md-3 mb-3 mb-md-0">
                              <Link to={`/property/${inquiry.listing.slug}`}>
                                <img
                                  src={inquiry.listing.primary_image?.image_url || "/images/image_not_found.png"}
                                  alt={inquiry.listing.title}
                                  className="w-100 h-100 object-fit-cover rounded-3"
                                  style={{ maxHeight: '150px' }}
                                  onError={(e) => {
                                    e.target.src = "/images/image_not_found.png";
                                  }}
                                />
                              </Link>
                            </div>

                            <div className="col-md-6">
                              <Link className="text-dark" to={`/property/${inquiry.listing.slug}`}>
                                <h5 className="mb-1 text-truncate">{inquiry.listing.title}</h5>
                              </Link>
                              <p className="mb-1 text-muted">
                                <User size={16} className="me-1" />
                                Host: {inquiry.listing.host?.name || 'N/A'}
                              </p>
                              {inquiry.listing.price && (
                                <p className="mb-1 text-muted small">
                                  Price: ${inquiry.listing.price}
                                </p>
                              )}
                              <p className="mb-2 small text-muted">
                                <MessageCircle size={16} className="me-1" />
                                {inquiry.message}
                              </p>
                              <p className="mb-0 small text_blue fw-semibold">
                                <Calendar size={14} className="me-1" />
                                Contacted on {formatDate(inquiry.created_at)}
                              </p>
                            </div>

                            <div className="col-md-3 text-md-end mt-3 mt-md-0">
                              <span
                                className={`badge ${getStatusBadgeClass(inquiry.status)}`}
                              >
                                {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                              </span>

                              <div className="mt-3">
                                <button
                                  className="theme_btn_small border-0"
                                //   onClick={() => handleContactAgain(inquiry)}
                                  onClick={() => {
                                    const listingData = {
                                        id: inquiry.listing_id,
                                        title: inquiry.listing?.title,
                                        price: inquiry.listing?.price,
                                        price_formatted: inquiry.listing?.price ? `$${inquiry.listing.price}` : null,
                                        host: {
                                        id: inquiry.listing?.host?.id,
                                        name: inquiry.listing?.host?.name,
                                        }
                                    };

                                    setActiveListing(listingData);
                                    setShowContact(true);
                                    }}
                                >
                                  Contact Again
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {/* Showing X to Y of Z results */}
                    {pagination.total > 0 && (
                      <div className="col-12 text-center text-muted small mt-2">
                        Showing {pagination.from} to {pagination.to} of {pagination.total} inquiries
                      </div>
                    )}
                    
                    {/* Pagination */}
                    {renderPagination()}
                  </>
                ) : (
                  <div className="col-12 text-center bg-white p-5 shadow-sm rounded-3">
                    <Home size={40} className="text_theme" />
                    <h6 className="mt-3">
                      You haven't contacted any hosts yet.
                    </h6>
                    
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ContactHostModal
        show={showContact}
         onClose={() => setShowContact(false)}
        listing={activeListing}
        
      />
    </>
  );
};

export default ContactedHosts;