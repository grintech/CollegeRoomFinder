import React from "react";

const WhyChooseUs = () => {
  return (
    <section className="why-choose-us">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="heading ">
            Why use <span className="text_theme fw-bold">CollegeRoomFinder?</span>
          </h2>
        </div>

        <div className="row justify-content-center text-center g-4">
          {/* Item 1 */}
          <div className="col-md-6 col-lg-4">
            <div className="why-card">
              <div className="why_icon_box">
                <i className="fi fi-rr-time-fast"></i>
              </div>
              <h5>Fast & Verified Listings</h5>
              <p>
                Discover verified student housing near your campus.
                New rooms and units are added frequently so you never miss a great option.
              </p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="col-md-6 col-lg-4">
            <div className="why-card">
              <div className="why_icon_box">
                <i className="fi fi-rr-shield-check"></i>
              </div>
              <h5>Safe & Secure</h5>
              <p>
                Your safety matters. We verify hosts and listings
                and ensure a trusted environment for students only.
              </p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="col-md-6 col-lg-4">
            <div className="why-card">
              <div className="why_icon_box">
               <i className="fi fi-rr-graduation-cap"></i>
              </div>
              <h5>Built for Students</h5>
              <p>
                Designed exclusively for college students,
                helping you find housing that fits your lifestyle, budget, and campus life.
              </p>
            </div>
          </div>
        </div>
        <div className="text-center mt-5">
            <button className="theme_outline_btn">See All Features</button>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
