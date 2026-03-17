import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import DashSidebar from "./DashSidebar";
import api from "../../services/api";

import { Calendar as CalIcon, Clock, User, MapPin, Home } from "lucide-react";
import TourCardSkeleton from "../../components/skeletons/TourCardSkeleton";

import Calendar from "react-calendar";
import toast from "react-hot-toast";
// import "react-calendar/dist/Calendar.css";

const BookedTours = () => {
  const { token } = useAuth();

  const [activeTab, setActiveTab] = useState("upcoming");
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showReschedule, setShowReschedule] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelTourId, setCancelTourId] = useState(null);
  const [cancelLoading, setCancelLoading] = useState(false);

  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState(""); 


  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formatTime = (time) => {
    if (!time) return "";
    const [hour, minute] = time.split(":");
    let h = parseInt(hour);
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12;
    if (h === 0) h = 12;
    return `${h}:${minute} ${ampm}`;
  };

  const formatDateForAPI = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

  const getStatusClass = (status) => {
    switch (status) {
      case "upcoming":
        return "badge bg-info";
      case "completed":
        return "badge bg-success";
      case "pending":
        return "badge bg-warning text-dark";
      case "reject":
        return "badge bg-danger";
      default:
        return "badge bg-secondary";
    }
  };

  const generateTimeSlots = () => {
    const slots = [];
    const startHour = 9;
    const endHour = 17;

    const now = new Date();
    let currentHour = startHour;

    if (
      selectedDate &&
      selectedDate.toDateString() === now.toDateString()
    ) {
      currentHour = now.getHours() + 1;
    }

    for (let h = currentHour; h <= endHour; h++) {
      let hour = h;
      let suffix = hour >= 12 ? "PM" : "AM";

      if (hour > 12) hour -= 12;
      if (hour === 0) hour = 12;

      slots.push(`${hour}:00 ${suffix}`);
    }

    return slots;
  };

  const convertTo24Hour = (time) => {
    const [hourMin, period] = time.split(" ");
    let [hour, minute] = hourMin.split(":");

    hour = parseInt(hour);

    if (period === "PM" && hour !== 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;

    return `${hour.toString().padStart(2, "0")}:${minute}`;
  };

  const fetchTours = async () => {
    try {
      setLoading(true);

      const res = await api.get("/my-booked-tours" );

      if (res.data?.status) {
        setTours(res.data.data.inquiries || []);
      }
    } catch (error) {
      console.error("Failed to fetch tours", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchTours();
  }, [token]);

 const cancelTour = async () => {
  try {
    setCancelLoading(true);

    const res = await api.delete(`/cancel-tour/${cancelTourId}` );

    if (res.data?.status) {
      toast.success(res.data.message || "Tour cancelled successfully");
    } else {
      toast.error(res.data.message || "Failed to cancel tour");
    }

    setShowCancelModal(false);
    setCancelTourId(null);
    fetchTours();

  } catch (error) {
    toast.error(
      error?.response?.data?.message || "Something went wrong"
    );
  } finally {
    setCancelLoading(false);
  }
};


 const submitReschedule = async () => {
  if (!selectedDate || !selectedTime) {
    setModalMessage("Please select date and time");
    setModalType("danger");

    setTimeout(() => setModalMessage(""), 2000);
    return;
  }

  try {
    setSubmitting(true);

    const res = await api.post(
      `/reschedule/${selectedTour.id}`,
      {
        tour_date: formatDateForAPI(selectedDate),
        tour_time: convertTo24Hour(selectedTime),
      }
    );

    setModalMessage(res?.data?.message || "Tour rescheduled successfully");
    setModalType("success");

    setTimeout(() => {
      setModalMessage("");
      setShowReschedule(false);
      setSelectedDate(null);
      setSelectedTime(null);
      setSelectedTour(null);
      fetchTours();
    }, 2000);

  } catch (error) {
    setModalMessage(
      error?.response?.data?.message || "Failed to reschedule"
    );
    setModalType("danger");

    setTimeout(() => setModalMessage(""), 2000);
  } finally {
    setSubmitting(false);
  }
};

  const filteredTours = tours.filter(
    (tour) => tour.tour_status === activeTab
  );

  return (
    <div className="my_account min_height">
      <div className="container py-4">
        <div className="row">

          <h1 className="mb-3 sec-title text-center">
            Your Property Tours{" "}
            <span className="text_blue">({tours.length})</span>
          </h1>

          <div className="col-lg-4 col-xl-3 mb-4 mb-lg-0">
            <DashSidebar />
          </div>

          <div className="col-lg-8 col-xl-9">

            <div className="tour_tabs">
              {/* Tabs */}
              <ul className="nav nav-tabs mb-4">
                {[
                  { value: "upcoming", label: "Upcoming" },
                  { value: "completed", label: "Completed" },
                  { value: "pending", label: "Pending" },
                  { value: "reject", label: "Rejected" },
                ].map((tab) => (
                  <li className="nav-item" key={tab.value}>
                    <button
                      className={`nav-link ${
                        activeTab === tab.value ? "active" : ""
                      }`}
                      onClick={() => setActiveTab(tab.value)}
                    >
                      {tab.label}
                    </button>
                  </li>
                ))}
              </ul>

            </div>

            {/* Loading */}
            {loading &&
              Array(3)
                .fill(0)
                .map((_, index) => <TourCardSkeleton key={index} />)}

            {/* Cards */}
            {!loading &&
              filteredTours.map((tour) => (
                <div className="tour_card_v2 mb-4" key={tour.id}>

                  <div className="tour_image">
                    <Link to={`/property/${tour.listing?.slug}`}>
                      <img
                        src={
                          tour.listing?.primary_image?.image_url ||
                          "/images/image_not_found.png"
                        }
                        alt={tour.listing?.title}
                      />
                    </Link>

                    <span className="tour_badge">
                      {tour.tour_type === "video"
                        ? "Video Tour"
                        : "In-Person"}
                    </span>
                  </div>

                  <div className="tour_content">

                    <div className="tour_header">
                      <div>
                        <h5>{tour.listing?.title}</h5>
                        <p className="tour_location mb-2">
                          <MapPin size={14} />{" "}
                          {tour.listing?.address || "N/A"}
                        </p>
                      </div>

                      <div className="tour_price">
                        ${tour.listing?.price}/Month
                      </div>
                    </div>

                    <div className="tour_meta">

                      <div className="d-flex align-items-center">
                        <User size={15} />{" "}
                        <span className="text-capitalize">{tour.listing?.host?.name}</span>
                      </div>

                      <div className="d-flex align-items-center">
                        <CalIcon size={15} />{" "}
                        {formatDate(tour.tour_date)}
                      </div>

                      <div className="d-flex align-items-center">
                        <Clock size={15} />{" "}
                        {formatTime(tour.tour_time)}
                      </div>

                    </div>

                    <div className="tour_footer">

                      <span
                        className={`${getStatusClass(
                          tour.tour_status
                        )} text-capitalize`}
                      >
                        {tour.tour_status === "reject"
                          ? "Rejected"
                          : tour.tour_status}
                      </span>

                      <div className="tour_actions">

                        <Link
                          to={`/property/${tour.listing?.slug}`}
                          className="btn btn-sm btn-primary rounded-2"
                        >
                          View
                        </Link>

                        {tour.tour_status === "upcoming" && (
                          <>
                            <button
                              className="btn btn-sm btn-warning rounded-2"
                              onClick={() => {
                                setSelectedTour(tour);
                                setSelectedDate(new Date(tour.tour_date));

                                const [hour, minute] = tour.tour_time.split(":");
                                let h = parseInt(hour);
                                let suffix = h >= 12 ? "PM" : "AM";

                                if (h > 12) h -= 12;
                                if (h === 0) h = 12;

                                setSelectedTime(`${h}:${minute} ${suffix}`);

                                setShowReschedule(true);
                              }}
                            >
                              Reschedule
                            </button>

                            <button
                              className="btn btn-sm btn-danger rounded-2"
                              onClick={() => {
                                setCancelTourId(tour.id);
                                setShowCancelModal(true);
                              }}
                            >
                              Cancel
                            </button>
                          </>
                        )}

                      </div>
                    </div>

                  </div>
                </div>
              ))}

              {!loading && filteredTours.length === 0 && (
              <div className="col-12 text-center bg-white p-5 shadow-sm rounded-3">
                <Home size={40} className="text_theme" />

                <h6 className="mt-3 text-capitalize">
                  No {activeTab === "reject" ? "rejected" : activeTab} tours available
                </h6>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Reschedule Modal */}

      {showReschedule && (
        <>
          <div className="modal fade show d-block reschedule_modal ">
            <div className="modal-dialog modal-md modal-dialog-centered">
              <div className="modal-content ">

                <div className="modal-header">
                  <h5 className="modal-title fw-bold">Reschedule Tour</h5>
                  <button
                    className="btn-close"
                    onClick={() => {
                      setShowReschedule(false);
                      setSelectedDate(null);
                      setSelectedTime(null);
                      setSelectedTour(null);
                    }}
                  ></button>
                </div>

                <div className="modal-body">

                  {selectedTour && (
                    <div className="alert alert-light text-center text_blue fw-semibold border mb-3">
                      Current: {formatDate(selectedTour.tour_date)} –{" "}
                      {formatTime(selectedTour.tour_time)}
                    </div>
                  )}
                  <h6 className="mb-3">
                        Select Date <span className="text-danger">*</span>
                      </h6>

                  <Calendar
                    value={selectedDate}
                    onChange={(date) => {
                      setSelectedDate(date);
                      setSelectedTime(null);
                    }}
                    showNeighboringMonth={false}
                    prev2Label={null}
                    next2Label={null}
                    tileDisabled={({ date }) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      return date < today;
                    }}
                  />

                  {selectedDate && (
                    <div className="mt-4">

                      <h6 className="mb-3">
                        Select Time <span className="text-danger">*</span>
                      </h6>

                      <div className="time-grid">
                        {generateTimeSlots().map((time) => (
                          <button
                            key={time}
                            className={`time-btn ${
                              selectedTime === time ? "active" : ""
                            }`}
                            onClick={() => setSelectedTime(time)}
                          >
                            {time}
                          </button>
                        ))}
                      </div>

                    </div>
                  )}

                </div>

                <div className="modal-footer flex-column">

                  {modalMessage && (
                    <div className={`text-${modalType} text-center fw-semibold mb-2`}>
                      {modalMessage}
                    </div>
                  )}

                  <div>
                    <button className="btn btn-secondary me-2" onClick={() => setShowReschedule(false)}>
                      Close
                    </button>

                    <button
                      className="btn btn-primary"
                      onClick={submitReschedule}
                      disabled={submitting}
                    >
                      {submitting ? "Submitting..." : "Confirm Reschedule"}
                    </button>
                  </div>

                </div>

              </div>
            </div>
          </div>

          <div className="modal-backdrop fade show"></div>
        </>
      )}

      {/* Cancel Modal */}

      {showCancelModal && (
        <>
          <div className="modal fade show d-block">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">

                <div className="modal-header">
                  <h5 className="modal-title">Cancel Tour</h5>
                  <button
                    className="btn-close"
                    onClick={() => setShowCancelModal(false)}
                  ></button>
                </div>

                <div className="modal-body text-center">
                  Are you sure you want to cancel this tour?
                </div>

                <div className="modal-footer justify-content-center">

                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowCancelModal(false)}
                  >
                    No
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={cancelTour}
                    disabled={cancelLoading}
                  >
                    {cancelLoading ? "Cancelling..." : "Yes, Cancel"}
                  </button>

                </div>

              </div>
            </div>
          </div>

          <div className="modal-backdrop fade show"></div>
        </>
      )}

    </div>
  );
};

export default BookedTours;