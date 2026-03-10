import {
  BedDouble,
  Bath,
  MapPin,
  Heart,
  Home,
  Loader,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DashSidebar from "./DashSidebar";
import ListingSkeleton from "../../components/skeletons/ListingSkeleton";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import toast from "react-hot-toast";

const SavedListings = () => {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [savingId, setSavingId] = useState(null);

  const { logout } = useAuth();
  const navigate = useNavigate();


  const fetchSavedListings = async (page = 1) => {
  try {
    setLoading(true);

    const response = await api.get(`/saved-listing?page=${page}`);

    if (response.data?.status === true) {
      setResults(response.data.data.listings || []);

      if (response.data.data.pagination) {
        setPagination(response.data.data.pagination);
      }
    }

  } catch (err) {

    if (err.response?.status === 422) {
      toast.error("Session expired. Please login again.");

      setTimeout(() => {
        logout();
        navigate("/login");
      }, 1000);

      return;
    }

    toast.error(
      err.response?.data?.message ||
      "Failed to load saved listings."
    );

  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchSavedListings(1);
  }, []);


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

  const handlePageChange = (page) => {
    fetchSavedListings(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleSave = async (slug, id) => {
    try {
        setSavingId(id);

        const response = await api.post(`/listings/${slug}/save-unsave`);

        if (response.data?.success) {

        const isSaved = response.data.saved;

        toast.success(response.data.message);

        if (!isSaved) {
            setResults((prev) => prev.filter((item) => item.id !== id));
        } else {
            setResults((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, is_saved: true } : item
            )
            );
        }
        }

    } catch (err) {

        if (err.response?.status === 422) {
        toast.error("Session expired. Please login again.");

        setTimeout(() => {
            logout();
            navigate("/login");
        }, 1000);

        return;
        }

        toast.error(
        err.response?.data?.message ||
        "Failed to update saved listing."
        );

    } finally {
        setSavingId(null);
    }
 };


  return (
    <>
      <div className="my_account min_height">
        <div className="container py-4">
          <div className="row">

            <h1 className="mb-3 sec-title text-center">
              Saved Listings
              <span className="text_blue"> ({results.length})</span>
            </h1>

            <div className="col-lg-4 col-xl-3 mb-4 mb-lg-0">
              <DashSidebar />
            </div>

            <div className="col-lg-8 col-xl-9 mb-4 mb-lg-0">

              <div className="row g-4">

                {loading ? (
                  <ListingSkeleton count={6} />
                ) : results.length ? (

                  results.map((item) => (
                    <div className="col-xxl-4 col-md-6" key={item.id}>
                      <div className="listing-card">

                        <Link
                          to={`/property/${item.slug}`}
                          className="listing-image"
                        >

                          <button
                            className={`save-btn ${item.is_saved ? "active" : ""}`}
                            onClick={(e) => {
                                e.preventDefault();
                                toggleSave(item.slug, item.id);
                            }}
                            disabled={savingId === item.id}
                            >
                            {savingId === item.id ? (
                                <Loader size={18} className="spinner text_theme" />
                            ) : (
                                <Heart
                                size={18}
                                fill={item.is_saved ? "var(--blue)" : "none"}
                                color={item.is_saved ? "var(--blue)" : "#333"}
                                />
                            )}
                            </button>

                          <img
                            src={item.primary_image || "/images/image_not_found.png"}
                            alt={item.title}
                          />
                        </Link>

                        <div className="listing-body">

                          <Link to={`/property/${item.slug}`}>
                            <h5 className="text-capitalize" >{item.title}</h5>
                          </Link>

                          <p className="listing-location">
                            {item.campus?.name}
                          </p>

                          <div className="listing-features">
                            <span>
                              <BedDouble size={16} /> {item.bedrooms} Bed
                            </span>

                            <span>
                              <Bath size={16} /> {item.bathrooms} Bath
                            </span>

                            <span>
                              <MapPin size={16} /> {item.distance_from_campus?.miles} mi
                            </span>
                          </div>

                          <div className="listing-price mb-0">
                            {item.price_formatted} <small>/ month</small>
                          </div>

                        </div>
                      </div>
                    </div>
                  ))

                ) : (
                  <div className="col-12 rounded-3 shadow-sm text-center bg-white p-4">
                    <Home size={40} className="text_theme" />
                    <h6 className="text-center text_theme mt-3 mb-0">
                      You haven’t saved any listings yet.
                    </h6>
                  </div>
                )}

              </div>

                {/* Pagination */}
               {pagination.last_page > 1 && (
                <nav className="mt-4">
                    <ul className="pagination justify-content-center">

                    <li className={`page-item ${!pagination.prev_page_url ? "disabled" : ""}`}>
                        <button
                        className="page-link"
                        onClick={() => handlePageChange(pagination.current_page - 1)}
                        disabled={!pagination.prev_page_url}
                        >
                        Previous
                        </button>
                    </li>

                    {[...Array(pagination.last_page)].map((_, index) => {
                        const page = index + 1;

                        return (
                        <li
                            key={page}
                            className={`page-item ${pagination.current_page === page ? "active" : ""}`}
                        >
                            <button
                            className="page-link"
                            onClick={() => handlePageChange(page)}
                            >
                            {page}
                            </button>
                        </li>
                        );
                    })}

                    <li className={`page-item ${!pagination.next_page_url ? "disabled" : ""}`}>
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
                )}

            </div>
          </div>


        </div>
      </div>
    </>
  );
};

export default SavedListings;