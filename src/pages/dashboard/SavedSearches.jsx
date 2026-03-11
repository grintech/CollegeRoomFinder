import { Clock, Home, Trash2 } from "lucide-react";
import DashSidebar from "./DashSidebar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import SavedSearchesSkeleton from "../../components/skeletons/SavedSearchesSkeleton";

const SavedSearches = () => {
  const [savedSearches, setSavedSearches] = useState([]);
  const navigate = useNavigate();
  const { token } = useAuth();

  const [loading, setLoading] = useState(true);

  // Fetch Saved Searches
  useEffect(() => {
    fetchSavedSearches();
  }, []);

  const fetchSavedSearches = async () => {
    try {
      setLoading(true);

      const res = await api.get("/saved-search-list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res?.data?.status) {
        const mapped = res.data.data.map((item) => ({
          id: item.id,
          university: item.university?.name,
          university_id: item.university_id,
          lease: item.lease_duration,
          price: item.max_budget,
          time: new Date(item.created_at).toLocaleDateString("en-GB").replace(/\//g, "-"), }));

        setSavedSearches(mapped);
      }
    } catch (error) {
      toast.error("Failed to fetch saved searches");
    } finally {
      setLoading(false);
    }
  };

  // Run Search
  const runSearch = (search) => {
    const params = new URLSearchParams({
      campus_id: search.university_id,
      lease_duration: search.lease,
      max_price: search.price,
    });

    navigate(`/?${params}&scroll=hero_search`);
  };

  // Delete Search
  const deleteSearch = async (id) => {
    try {
      const res = await api.delete(`/save-search-delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res?.data?.status) {
        toast.success(res.data.message || "Search removed");

        setSavedSearches((prev) => prev.filter((search) => search.id !== id));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete search");
    }
  };

  return (
    <>
      <div className="my_account min_height">
        <div className="container py-4">
          <div className="row">
            <h1 className="mb-3 sec-title text-center">
              Saved Searches
              <span className="text_blue"> ({savedSearches.length})</span>
            </h1>

            <div className="col-lg-4 col-xl-3 mb-4 mb-lg-0">
              <DashSidebar />
            </div>

            <div className="col-lg-8 col-xl-9">
              {loading ? (
                <SavedSearchesSkeleton />
              ) : savedSearches.length === 0 ? (
                <div className="col-12 text-center bg-white p-5 shadow-sm rounded-3">
                  <Home size={40} className="text_theme" />
                  <h6 className="mt-3">No saved searches yet.</h6>
                </div>
              ) : (
                <div className="row">
                  {savedSearches.map((search) => (
                    <div className="col-sm-6 col-xxl-4 mb-4" key={search.id}>
                      <div className="saved-search-card">
                        <h5 className="uni-name">{search.university}</h5>

                        <div className="search-meta">
                         {search?.lease && (
                          <p className="text-capitalize">
                            <strong>Lease : </strong> {search?.lease || "N/A"}
                          </p>
                         )}

                         {search?.price && (
                          <p>
                            <strong>Max Budget : </strong>${search?.price}/mo
                          </p>
                         )} 

                        </div>

                        <p className="text-muted small mt-2 mb-0 d-flex align-items-center gap-1">
                          <Clock size={14} />
                          <span> Saved on {search.time}</span>
                        </p>

                        <div className="search-actions">
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => runSearch(search)}
                          >
                            Run Search
                          </button>

                          <button
                            className="btn btn-danger btn-sm d-flex align-items-center justify-content-center"
                            onClick={() => deleteSearch(search.id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SavedSearches;
