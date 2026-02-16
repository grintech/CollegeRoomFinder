import React from "react";
import { Bell, GraduationCap, MapPin } from "lucide-react";

const HostContact = () => {
  return (
    <section id="portfolio_demo" className="hostcontact" >
      <div className="container">
        <div className="row  align-items-center g-md-5">
          {/* LEFT CONTENT */}
          <div className="col-lg-6 text-white mb-3">
            <h2 className="fw-bold ">
              Book a <span className="text-warning"> Portfolio Demo</span>
            </h2>

            <p className="mt-3 opacity-75">
              Discover how CollegeRoomFinder helps landlords fill student rooms
              faster. Get a personalized walkthrough of how our platform
              connects your property with verified college students actively
              searching for accommodation.
            </p>

            <ul className="list-unstyled mt-4">
              <li className="d-flex align-items-start mb-3">
                <span className="icon-box me-3">
                  <Bell size={20} />
                </span>
                <div className="icon_box">
                  <h5>Student Housing Management</h5>
                  <p>
                    Easily list and manage multiple student properties from one
                    centralized dashboard. Update pricing, availability, and
                    room details anytime.
                  </p>
                </div>
              </li>

              <li className="d-flex align-items-start mb-3">
                <span className="icon-box me-3">
                  <GraduationCap size={20} />
                </span>
                <div className="icon_box">
                  <h5>Verified Student Inquiries</h5>
                  <p>
                    Connect directly with genuine students actively searching
                    for accommodation near their college or university.
                  </p>
                </div>
              </li>

              <li className="d-flex align-items-start">
                <span className="icon-box me-3">
                  <MapPin size={20} />
                </span>
                <div className="icon_box">
                  <h5>High-Demand Season Ready</h5>
                  <p>
                    Prepare your listings ahead of admission season and maximize
                    occupancy during peak student housing demand.
                  </p>
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
                      className="form-control"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="col-12 mb-3">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="example@gmail.com"
                    />
                  </div>
                  <div className="col-12 mb-3">
                    <label className="form-label">I am a...</label>
                    <select className="form-select">
                      <option value="Individual Landlord">
                        Individual Landlord
                      </option>
                      <option value="Property Manager">Property Manager</option>
                      <option value="Real Estate Company">
                        Real Estate Company
                      </option>
                    </select>
                  </div>
                  {/* <div className="co-12 mb-3">
                  <label className="form-label">Additional Information (Optional)</label>
                  <textarea
                    rows="3"
                    className="form-control"
                    placeholder="Any specific requirements or preferences..."
                  />
                </div> */}

                  <div className="col-12">
                    <button type="button" className="blue_btn w-100">
                      Request Portfolio Demo
                    </button>
                  </div>

                  <div className="col-12 mt-3">
                    <p className="small text-muted  mb-0">
                      By submitting, you agree to receive communications from
                      SphereHub. We respect your privacy and won't spam you.
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
