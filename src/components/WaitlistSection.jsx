import React from "react";
import { Bell, GraduationCap, MapPin } from "lucide-react";

const WaitlistSection = () => {
  return (
    <section className="waitlist-section ">
      <div className="container">
        <div className="row  align-items-center g-md-5">
          
          {/* LEFT CONTENT */}
          <div className="col-lg-6 text-white">
            <span className="coming_soon text-white mb-3">
              Coming soon to your campus
            </span>

            <h2 className="fw-bold display-6 mt-3">
              Get Notified When <br />
              <span className="text-warning">CollegeRoomFinder</span> Launches Near You
            </h2>

            <p className="mt-3 opacity-75">
              We’re rolling out campus by campus. Join the waitlist and be the
              first to find rooms and roommates near your college.
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

          {/* RIGHT FORM */}
          <div className="col-lg-6">
            <div className="waitlist-card p-4 py-md-5 px-md-5">
              <h5 className="fw-bold mb-4">Join the Waitlist</h5>

              <form>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your name"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="you@college.edu"
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">University / College</label>
                  <select className="form-select">
                    <option>Select your university</option>
                    <option>Towson University</option>
                    <option>Morgan State University</option>
                    <option>John Hawkins University</option>
                    <option>Other</option>
                  </select>
                </div>

                <button type="button" className="blue_btn w-100">
                  Join Waitlist
                </button>

                <p className="small text-muted mt-3 mb-0">
                  No spam. We’ll only notify you when we launch near your campus.
                </p>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WaitlistSection;
