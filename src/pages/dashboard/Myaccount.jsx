import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import DashSidebar from "./DashSidebar";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import api from "../../services/api";
import DashboardCardsSkeleton from "../../components/skeletons/DashboardCardsSkeleton";

const Myaccount = () => {
  const { user, token } = useAuth();

  const [counts, setCounts] = useState({
    SavedListingsCount: 0,
    InquiryCount: 0,
    SavedSearchCount: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetchCounts();
    }
  }, [token]);

  const fetchCounts = async () => {
    try {
      const res = await api.get("/dashboard/counts", 
    );

      if (res.data?.status) {
        setCounts(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard counts", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="my_account min_height">
        <div className="container py-4">
          <div className="row">
            <div className="col-lg-4 col-xl-3 mb-4 mb-lg-0">
              <DashSidebar />
            </div>

            <div className="col-lg-8 col-xl-9 mb-4 mb-lg-0 ">
              <h1 className="text-center sec-title">
                Welcome <span className="text_theme">{user?.name}</span> to your account
              </h1>

              <h6 className="text-center">
                Here you can manage your profile, view saved listings, view booked tours and keep track of your activities.
              </h6>

            {loading ? (
                <DashboardCardsSkeleton />
            ) : (

              <div className="row mt-4 mt-md-5 dashboard_counts">

                {/* Saved Listings */}
                <div className="col-sm-6 col-xl-3 mb-4 mb-xl-0">
                  <Link to="/saved-listings">
                    <div className="statistics_funfact h-100">
                      <div className="d-flex justify-content-between">
                        <div className="details">
                          <div className="title">
                            <CountUp end={counts.SavedListingsCount || 0} duration={2} />
                          </div>
                        </div>
                        <div className="icon text-center">
                          <i className="fa-regular fa-heart"></i>
                        </div>
                      </div>
                      <div className="text fz25 mt-2">Your Favourites</div>
                    </div>
                  </Link>
                </div>

                {/* Contacted Hosts */}
                <div className="col-sm-6 col-xl-3 mb-4 mb-xl-0">
                  <Link to="/contacted-hosts">
                    <div className="statistics_funfact h-100">
                      <div className="d-flex justify-content-between">
                        <div className="details">
                          <div className="title">
                            <CountUp end={counts.InquiryCount || 0} duration={2} />
                          </div>
                        </div>
                        <div className="icon text-center">
                          <i className="fa-regular fa-bookmark"></i>
                        </div>
                      </div>
                      <div className="text fz25 mt-2">Contacted Hosts</div>
                    </div>
                  </Link>
                </div>

                {/* Booked Tours */}
                <div className="col-sm-6 col-xl-3 mb-4 mb-xl-0">
                  <Link to="/booked-tours">
                    <div className="statistics_funfact h-100">
                      <div className="d-flex justify-content-between">
                        <div className="details">
                          <div className="title">
                            <CountUp end={counts.BookedToursCount || 0} duration={2} />
                          </div>
                        </div>
                        <div className="icon text-center">
                          <i className="fa-regular fa-calendar"></i>
                        </div>
                      </div>
                      <div className="text fz25 mt-2">Booked Tours</div>
                    </div>
                  </Link>
                </div>

                {/* Saved Searches */}
                <div className="col-sm-6 col-xl-3 mb-4 mb-xl-0">
                  <Link to="/saved-searches">
                    <div className="statistics_funfact h-100">
                      <div className="d-flex justify-content-between">
                        <div className="details">
                          <div className="title">
                            <CountUp end={counts.SavedSearchCount || 0} duration={2} />
                          </div>
                        </div>
                        <div className="icon text-center">
                          <i className="fas fa-magnifying-glass"></i>
                        </div>
                      </div>
                      <div className="text fz25 mt-2">Saved Searches</div>
                    </div>
                  </Link>
                </div>

              </div>
            )}
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Myaccount;