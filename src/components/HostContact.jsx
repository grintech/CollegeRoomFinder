import { Bell, GraduationCap, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import api from "../services/api";

const HostContact = () => {
  const { user ,token } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    host_type: "Individual Landlord",
    note: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [isError, setIsError] = useState(false);

  // Auto hide message after 2 seconds
  useEffect(() => {
    if (responseMsg) {
      const timer = setTimeout(() => {
        setResponseMsg("");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [responseMsg]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async () => {
  setResponseMsg("");

  if (user?.role !== "host") {
    toast.error("Login as host to book demo.");
    return;
  }

  if (
    !formData.name.trim() ||
    !formData.email.trim() ||
    !formData.host_type.trim() ||
    !formData.note.trim()
  ) {
    setIsError(true);
    setResponseMsg("All fields are required.");
    return;
  }

  try {
    setLoading(true);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("host_type", formData.host_type);
    data.append("note", formData.note);

    const response = await api.post(
      "/book-portfolio-demo",
      data,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );

    const result = response.data;

    if (result?.status) {
      setIsError(false);
      setResponseMsg(result.message || "Portfolio demo booked successfully.");

      setFormData({
        name: "",
        email: "",
        host_type: "Individual Landlord",
        note: "",
      });
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
    <section id="portfolio_demo" className="hostcontact">
      <div className="container">
        <div className="row align-items-center g-md-5">

          {/* LEFT CONTENT */}
          <div className="col-lg-6 text-white mb-3">
            <h2 className="fw-bold">
              Book a <span className="text_theme">Portfolio Demo</span>
            </h2>

            <p className="mt-3 opacity-75">
              Discover how CollegeRoomFinder helps landlords fill student rooms
              faster with verified student inquiries.
            </p>

            <ul className="list-unstyled mt-4">
              <li className="d-flex align-items-start mb-3">
                <span className="icon-box me-3">
                  <Bell size={20} />
                </span>
                <div className="icon_box">
                  <h5>Student Housing Management</h5>
                  <p>Manage multiple student properties easily.</p>
                </div>
              </li>

              <li className="d-flex align-items-start mb-3">
                <span className="icon-box me-3">
                  <GraduationCap size={20} />
                </span>
                <div className="icon_box">
                  <h5>Verified Student Inquiries</h5>
                  <p>Connect directly with genuine students.</p>
                </div>
              </li>

              <li className="d-flex align-items-start">
                <span className="icon-box me-3">
                  <MapPin size={20} />
                </span>
                <div className="icon_box">
                  <h5>High-Demand Season Ready</h5>
                  <p>Prepare listings ahead of admission season.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* RIGHT FORM */}
          <div className="col-lg-6">
            <div className="waitlist-card p-4 py-md-5 px-md-5">
              <h5 className="fw-bold text_dark mb-4">Request Your Demo</h5>

              <form>
                <div className="row">

                  <div className="col-12 mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="col-12 mb-3">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="example@gmail.com"
                    />
                  </div>

                  <div className="col-12 mb-3">
                    <label className="form-label">I am a...</label>
                    <select
                      name="host_type"
                      value={formData.host_type}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="Individual Landlord">
                        Individual Landlord
                      </option>
                      <option value="Property Manager">
                        Property Manager
                      </option>
                      <option value="Real Estate Company">
                        Real Estate Company
                      </option>
                    </select>
                  </div>

                  <div className="col-12 mb-3">
                    <label className="form-label">
                      Additional Information
                    </label>
                    <textarea
                      rows="3"
                      name="note"
                      value={formData.note}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Any specific requirements..."
                    />
                  </div>

                  {/* MESSAGE */}
                  {responseMsg && (
                    <div className="col-12 mb-2">
                      <p
                        className={`fw-semibold text-center ${
                          isError ? "text-danger" : "text-success"
                        }`}
                      >
                        {responseMsg}
                      </p>
                    </div>
                  )}

                  <div className="col-12">
                    <button
                      type="button"
                      className="blue_btn w-100"
                      disabled={loading}
                      onClick={handleSubmit}
                    >
                      {loading
                        ? "Submitting..."
                        : "Request Portfolio Demo"}
                    </button>
                  </div>

                  <div className="col-12 mt-3">
                    <p className="small text-muted mb-0">
                      By submitting, you agree to receive communications from
                      College Room Finder.
                    </p>
                  </div>

                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HostContact;