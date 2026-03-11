import { Bell, GraduationCap, MapPin } from "lucide-react";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import { useRef, useState } from "react";
import axios from "axios";

const libraries = ["places"];

const initialFormState = {
  student_full_name: "",
  student_university_name: "",
  student_email: "",
  city: "",
  state: "",
  country: "",
  additional_information: "",
  address: "",
  latitude: "",
  longitude: "",
};

const WaitlistSection = () => {
  const autocompleteRef = useRef(null);

  const [formData, setFormData] = useState(initialFormState);
  const [responseMsg, setResponseMsg] = useState("");
  const [responseStatus, setResponseStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();

    let city = "";
    let state = "";
    let country = "";
    let latitude = "";
    let longitude = "";

    if (place.geometry) {
      latitude = place.geometry.location.lat();
      longitude = place.geometry.location.lng();
    }

    place.address_components.forEach((component) => {
      const types = component.types;

      if (types.includes("locality")) city = component.long_name;
      if (types.includes("administrative_area_level_1"))
        state = component.long_name;
      if (types.includes("country")) country = component.long_name;
    });

    setFormData((prev) => ({
      ...prev,
      address: place.formatted_address,
      city,
      state,
      country,
      latitude,
      longitude,
    }));
  };

  const handleSubmit = async () => {
    if (
      !formData.student_full_name ||
      !formData.student_university_name ||
      !formData.student_email ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.country
    ) {
      setResponseStatus("danger");
      setResponseMsg("Please fill all required fields");

      setTimeout(() => {
        setResponseMsg("");
        setResponseStatus("");
      }, 1000);

      return;
    }

    try {
      setLoading(true);

      const form = new FormData();
      Object.keys(formData).forEach((key) => {
        form.append(key, formData[key]);
      });

      const res = await axios.post(
        "https://roomfinder.grincloudhost.com/api/student/wait/list",
        form
      );

      if (res.data.success) {
        setResponseStatus("success");
        setResponseMsg(res.data.message);

        // reset form
        setFormData(initialFormState);
      } else {
        setResponseStatus("danger");
        setResponseMsg(res.data.message);
      }
    } catch (error) {
      if (error?.response?.status === 422) {
        const errors = error.response.data.errors;

        if (errors?.student_email) {
          setResponseMsg(errors.student_email[0]);
        } else {
          setResponseMsg("Validation error");
        }

        setResponseStatus("danger");
      } else {
        setResponseMsg("Something went wrong");
        setResponseStatus("danger");
      }
    } finally {
      setLoading(false);

      setTimeout(() => {
        setResponseMsg("");
        setResponseStatus("");
      }, 1000);
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={libraries}
    >
      <section className="waitlist-section">
        <div className="container">
          <div className="row align-items-center g-md-5">

            {/* LEFT CONTENT */}
            <div className="col-lg-6 text-white">
              <span className="coming_soon text-white mb-3">
                Coming soon to your campus
              </span>

              <h2 className="fw-bold display-6 mt-3">
                Get Notified When <br />
                <span className="text_theme">College Room Finder</span> Launches Near You
              </h2>

              <p className="mt-3 opacity-75">
                We’re rolling out campus by campus. Join the waitlist and be the
                first to find rooms near your college.
              </p>

              <ul className="list-unstyled mt-4">
                <li className="d-flex align-items-start mb-3">
                  <span className="icon-box me-3"><Bell size={20} /></span>
                  <span>Early access before other students</span>
                </li>
                <li className="d-flex align-items-start mb-3">
                  <span className="icon-box me-3"><GraduationCap size={20} /></span>
                  <span>Help us launch faster at your university</span>
                </li>
                <li className="d-flex align-items-start">
                  <span className="icon-box me-3"><MapPin size={20} /></span>
                  <span>Currently expanding across major campuses</span>
                </li>
              </ul>
            </div>

            {/* FORM */}
            <div className="col-lg-6">
              <div className="waitlist-card p-4 py-md-5 px-md-5">
                <h5 className="fw-bold mb-4">Join the Waitlist</h5>

                <div className="row">

                  <div className="col-12 mb-3">
                    <label className="form-label">Student Full Name</label>
                    <input
                      type="text"
                      name="student_full_name"
                      value={formData.student_full_name}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="e.g. John Doe"
                    />
                  </div>

                  <div className="col-12 mb-3">
                    <label className="form-label">Student University Name</label>
                    <input
                      type="text"
                      name="student_university_name"
                      value={formData.student_university_name}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="e.g. Stanford University"
                    />
                  </div>

                  <div className="col-12 mb-3">
                    <label className="form-label">Student Email Address</label>
                    <input
                      type="email"
                      name="student_email"
                      value={formData.student_email}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="you@student.edu"
                    />
                  </div>

                  <div className="col-12 mb-3">
                    <label className="form-label">Address</label>

                    <Autocomplete
                      onLoad={(auto) => (autocompleteRef.current = auto)}
                      onPlaceChanged={handlePlaceChanged}
                    >
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Start typing your address..."
                      />
                    </Autocomplete>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      value={formData.city}
                      readOnly
                      className="form-control"
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">State</label>
                    <input
                      type="text"
                      value={formData.state}
                      readOnly
                      className="form-control"
                    />
                  </div>

                  <div className="col-12 mb-3">
                    <label className="form-label">Country</label>
                    <input
                      type="text"
                      value={formData.country}
                      readOnly
                      className="form-control"
                    />
                  </div>

                  <div className="col-12 mb-3">
                    <label className="form-label">Additional Information</label>
                    <textarea
                      rows="3"
                      name="additional_information"
                      value={formData.additional_information}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>

                  {responseMsg && (
                    <div className={`col-12 mb-2 text-${responseStatus}`}>
                      {responseMsg}
                    </div>
                  )}

                  <div className="col-12">
                    <button
                      type="button"
                      className="blue_btn w-100"
                      disabled={loading}
                      onClick={handleSubmit}
                    >
                      {loading ? "Submitting..." : "Join Waitlist"}
                    </button>
                  </div>

                  <div className="col-12 mt-3">
                    <p className="small text-muted mb-0">
                      No spam. We’ll only notify you when we launch near your campus.
                    </p>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </LoadScript>
  );
};

export default WaitlistSection;