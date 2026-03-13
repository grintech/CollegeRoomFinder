import {
  X,
  Calendar as CalIcon,
  MapPin,
  Video,
  Clock,
  Users,
  Lightbulb,
} from "lucide-react";
import Calendar from "react-calendar";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const BookTourModal = ({ show, onClose, listing }) => {
  const { user, token } = useAuth();

  const [activeTab, setActiveTab] = useState("tour");
  const [tourType, setTourType] = useState("in_person");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
  if (responseMsg) {
    const timer = setTimeout(() => {
      setResponseMsg("");

      // Close modal only if success
      if (!isError) {
        onClose();
      }
    }, 2000);

    return () => clearTimeout(timer);
  }
}, [responseMsg, isError, onClose]);

  if (!show) return null;


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

    if (period === "PM" && hour !== 12) {
      hour += 12;
    }

    if (period === "AM" && hour === 12) {
      hour = 0;
    }

    return `${hour.toString().padStart(2, "0")}:${minute}`;
  };


  const formatLocalDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};


  const handleSubmit = async () => {
    setResponseMsg("");

    if (!user?.name || !user?.email || !user?.phone) {
      setIsError(true);
      setResponseMsg("User information is missing.");
      return;
    }

    if (activeTab === "tour" && !message?.trim()) {
      setIsError(true);
      setResponseMsg("Please fill the notes.");
      return;
    }
    if (activeTab === "tour" && (!selectedDate || !selectedTime)) {
      setIsError(true);
      setResponseMsg("Please select date and time for the tour.");
      return;
    }


    try {
      setLoading(true);

      const payload = {
        listing_id: listing?.id,
        host_id: listing?.host?.id,
        type: activeTab === "tour" ? "book_tour" : "waitlist",
        name: user?.name,
        email: user?.email,
        phone_no: user?.phone,
        message: activeTab === "reserve" ? "I want to join waitlist" : message,
      };

      if (activeTab === "tour") {
        payload.tour_type = tourType;
        // payload.tour_date = selectedDate.toISOString().split("T")[0];
        payload.tour_date = formatLocalDate(selectedDate);
        payload.tour_time = convertTo24Hour(selectedTime);
      }

      const response = await api.post("/inquiries", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = response.data;

      if (result?.status === true) {
        setIsError(false);
        setResponseMsg(result.message || "Request submitted successfully.");

        setSelectedDate(null);
        setSelectedTime(null);
        setMessage("");
      } else {
        setIsError(true);
        setResponseMsg(result?.message || "Something went wrong.");
      }
    } catch (error) {
      setIsError(true);
      setResponseMsg(
        error?.response?.data?.message || "Failed to submit request."
      );
    } finally {
      setLoading(false);
    }
  };

 

  return (
    <div className="modal-backdrop-custom" onClick={onClose}>
      <div className="booktour-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div>
            <h5 className="mb-1">{listing?.title}</h5>
            <p className="small mb-0">${listing?.price}/mo</p>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div className="tour-tabs flex-column mt-4">
         <div className="d-flex flex-wrap gap-3">
           <button
            className={activeTab === "tour" ? "active" : ""}
            onClick={() => {setActiveTab("tour"); setResponseMsg("");}}
          >
            <CalIcon size={16} /> Schedule Tour
          </button>

          <button
            className={activeTab === "reserve" ? "active" : ""}
            onClick={() => {setActiveTab("reserve"); setResponseMsg("");}}
          >
            <Users size={16} /> Reserve Room
          </button>
         </div>

            {/* API Response Message */}
            {responseMsg && (
              <p
                className={`text-center fw-semibold mt-3 ${
                  isError ? "text-danger" : "text-success"
                }`}
              >
                {responseMsg}
              </p>
            )}

        </div>


        {activeTab === "tour" && (
          <div className="tour_room">
            <div className="mb-3">
              <label className="small fw-semibold">
                Notes for the host <span className="text-danger">*</span>
              </label>
              <textarea
                className="form-control"
                placeholder="Any questions or special requests..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <div className="tour-box mb-3">
              <h6>Tour Type <span className="text-danger">*</span></h6>

              <div className="tour-type">
                <label>
                  <input
                    type="radio"
                    checked={tourType === "in_person"}
                    onChange={() => setTourType("in_person")}
                  />
                  <MapPin size={16} /> In-Person
                </label>

                <label>
                  <input
                    type="radio"
                    checked={tourType === "video"}
                    onChange={() => setTourType("video")}
                  />
                  <Video size={16} /> Video Tour
                </label>
              </div>
            </div>

            <div className="tour-box mb-3">
              <h6>Select Date <span className="text-danger">*</span></h6>

              <Calendar
                value={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date);
                  setSelectedTime(null);
                }}
                showNeighboringMonth={false}
                prev2Label={null}
                next2Label={null}
                tileDisabled={({ date, view }) => {
                  if (view !== "month") return false;

                  const now = new Date();

                  const today = new Date();
                  today.setHours(0, 0, 0, 0);

                  if (date < today) return true;

                  if (
                    date.toDateString() === now.toDateString() &&
                    now.getHours() >= 17
                  ) {
                    return true;
                  }

                  return false;
                }}
              />
            </div>

            {selectedDate && (
              <div className="tour-box">
                <h6 className="mb-3 d-flex align-items-center">
                  <Clock size={16} className="me-2" />
                  Select Time <span className="text-danger mx-1">*</span> –{" "}
                  {selectedDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                  })}
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

            <div className="modal-footer">
              <button
                className="blue_btn w-100"
                disabled={loading }
                onClick={handleSubmit}
              >
                {loading ? "Submitting..." : "Confirm Tour"}
              </button>
            </div>
          </div>
        )}

        {activeTab === "reserve" && (
          <div className="reserve_room">
            <div className="reserve-card mb-3">
              <div className="reserve-header">
                <div>
                  <h6>Room Availability</h6>
                  <p className="small text-muted mt-2 mb-0">
                    This room is in high demand. Join the waitlist to be notified
                    when it becomes available.
                  </p>
                </div>

                <span className="badge-limited">Limited Spots</span>
              </div>

              
            </div>

            <div className="reserve-card mb-3">
              <div className="waitlist-title mb-2">
                <span className="info-dot">!</span>
                <h6>Join the Waitlist</h6>
              </div>

              <p className="small text-muted">
                Be the first to know when this room becomes available
              </p>

              <div className="waitlist-box">
                <p className="fw-semibold mb-2">What happens next?</p>

                <ul className="waitlist-list">
                  <li>You’ll be added to the waitlist</li>
                  <li>Get notified when the room is available</li>
                  <li>First come, first served for reservations</li>
                </ul>
              </div>

              <button
                className="blue_btn w-100 mt-3"
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? "Submitting..." : "Click to Join Waitlist"}
              </button>
            </div>

            <div className="reserve-tip">
              <Lightbulb className="text_theme" size={16} /> Tip: Schedule a
              tour first to see the property and meet potential roommates. This
              can help you move up the waitlist!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookTourModal;