import { X, Calendar as CalIcon, MapPin, Video, Clock, Users, Lightbulb } from "lucide-react";
import Calendar from "react-calendar";
import { useState } from "react";

const BookTourModal = ({ show, onClose, listing }) => {
  const [activeTab, setActiveTab] = useState("tour");
  const [tourType, setTourType] = useState("in_person");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  if (!show) return null;

  const today = new Date();
  const availableTill = new Date(2026, 2, 20); // March 20, 2026

  const times = [
    "9:00 AM", "10:00 AM", "11:00 AM",
    "12:00 PM", "1:00 PM", "2:00 PM",
    "3:00 PM", "4:00 PM", "5:00 PM",
  ];

  return (
    <div className="modal-backdrop-custom" onClick={onClose}>
      <div className="booktour-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div>
            <h5 className="mb-1">{listing?.title}</h5>
            <p className="text-muted small mb-0">
              ${listing?.price}/mo • {listing?.beds} bed • {listing?.baths} bath
            </p>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div className="tour-tabs mt-4">
          <button
            className={activeTab === "tour" ? "active" : ""}
            onClick={() => setActiveTab("tour")}
          >
            <CalIcon size={16} /> Schedule Tour
          </button>
          <button
            className={activeTab === "reserve" ? "active" : ""}
            onClick={() => setActiveTab("reserve")}
          >
           <Users size={16} /> Reserve Room
          </button>
        </div>

        {activeTab === "tour" && (
          <div className="tour_room">
            <div className="mb-3">
              <label className="small fw-semibold">
                Notes for the host (optional)
              </label>
              <textarea
                className="form-control"
                placeholder="Any questions or special requests..."
              />
            </div>

            <div className="tour-box mb-3">
              <h6>Tour Type</h6>
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
              <h6>Select Date</h6>

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

                    return (
                    date < today ||
                    date > availableTill
                    );
                }}
                />

              <p className="small text_blue fw-bold mt-3 mb-0">
                Available till {availableTill.toDateString()}
              </p>
            </div>

            {/* Time slots (only after date selected) */}
            {selectedDate && (
              <div className="tour-box">
                <h6 className="mb-3 d-flex align-items-center">
                  <Clock size={16} className="me-2" /> Select Time –{" "}
                  {selectedDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                  })}
                </h6>

                <div className="time-grid">
                  {times.map((time) => (
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
                disabled={!selectedDate || !selectedTime}
                onClick={onClose}
              >
                Confirm Tour
              </button>
            </div>
          </div>
        )}

       {activeTab === "reserve" && (
        <div className="reserve_room">
            <div className="reserve-card mb-3">
            <div className="reserve-header">
                <div>
                <h6 className="">Room Availability</h6>
                <p className="small text-muted mt-2 mb-0">
                    This room is in high demand. Join the waitlist to be notified when it becomes available.
                </p>
                </div>

                <span className="badge-limited">Limited Spots</span>
            </div>

            <div className="reserve-meta">
                <span>
                <Users size={14} /> {listing?.beds} total beds
                </span>
                <span>
                <Clock size={14} /> ~2 week avg. wait
                </span>
            </div>
            </div>

            <div className="reserve-card mb-3">
            <div className="waitlist-title mb-2">
                <span className="info-dot">!</span>
                <h6 className="">Join the Waitlist</h6>
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

            <button className="blue_btn w-100 mt-3">
                <span>Join Waitlist</span>
            </button>
            </div>

            <div className="reserve-tip">
            <Lightbulb className="text_theme" size={16} /> Tip: Schedule a tour first to see the property and meet potential roommates.
            This can help you move up the waitlist!
            </div>
        </div>
        )}

      </div>
    </div>
  );
};

export default BookTourModal;
