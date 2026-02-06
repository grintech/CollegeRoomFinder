import React from "react";

const WhyChooseUs = () => {
  return (
    <section  id="about" className="why-choose-us">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="heading ">
            Why use <span className="text_theme fw-bold">CollegeRoomFinder?</span>
          </h2>
          <p>College Room Finder makes off-campus housing simple.</p>
        </div>

        <div className="row justify-content-center text-center g-4 mb-4">
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
        <div className="col-lg-10 text-center mx-auto text_blue">
          <h6 className="text-center">
          We connect college students with quality rooms and homes near campus—while helping property owners reach the right student renters, faster.
        </h6>
        <h6>Built specifically for student housing, our platform focuses on location, clarity, and trust—so students avoid the chaos, parents gain peace of mind, and hosts get reliable demand.</h6>
        <h6 className="text_theme">One platform. One purpose. Better college housing.</h6>
        </div>
        {/* <div className="text-center mt-5">
            <button className="theme_outline_btn">See All Features</button>
        </div> */}
      </div>
    </section>
  );
};

export default WhyChooseUs;
