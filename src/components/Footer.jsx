import React from "react";

const Footer = () => {
  return (
    <footer className="footer-section pt-5">
      <div className="container">

        {/* TOP GRID */}
        <div className="row align-items-baseline gy-4">

          {/* BRAND */}
          <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-6 text-start">
            <a className="navbar-brand d-flex align-items-center gap-2" href="/">
              <img src="/images/logo_new.png" alt="logo" width={180} />
            </a>
            <p className="mt-3 footer-text">
              Find verified rooms near colleges. Simple, safe, and student-friendly.
            </p>

            {/* SOCIAL */}
            <div className="d-flex gap-3 mt-3">
              <a href="#" className="social-icon"><i className="fa-brands fa-facebook"></i></a>
              <a href="#" className="social-icon"><i className="fa-brands fa-twitter"></i></a>
              <a href="#" className="social-icon"><i className="fa-brands fa-instagram"></i></a>
              <a href="#" className="social-icon"><i className="fa-brands fa-linkedin"></i></a>
            </div>
          </div>

          {/* STUDENTS */}
          <div className="col-xxl-2 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6 text-start">
            <h6 className="footer-title">For Students</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="footer-link">Find Rooms</a></li>
              <li><a href="#" className="footer-link">My Enquiries</a></li>
              <li><a href="#" className="footer-link">Saved Properties</a></li>
            </ul>
          </div>

          {/* HOSTS */}
          <div className="col-xxl-2 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6 text-start">
            <h6 className="footer-title">For Hosts</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="footer-link">List Property</a></li>
              <li><a href="#" className="footer-link">My Listings</a></li>
              <li><a href="#" className="footer-link">Pricing Plans</a></li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div className="col-xxl-2 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6 text-start">
            <h6 className="footer-title">Support</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="footer-link">Contact Us</a></li>
              <li><a href="#" className="footer-link">Privacy Policy</a></li>
              <li><a href="#" className="footer-link">Terms</a></li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div className="col-xxl-3 col-xl-8 col-lg-8 col-sm-6 col-md-12 text-start">
            <h6 className="footer-title">Stay Updated</h6>
            <p className="small footer-text">
              Get new listings & updates.
            </p>
            <div className="newsletter-box">
              <input type="email" placeholder="Email address" />
              <button>Subscribe</button>
            </div>
          </div>
        </div>

        <hr className="footer-divider my-4" />

        {/* BOTTOM */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center small footer-bottom mb-4">
          <span>© 2026 CollegeRoomFinder. All rights reserved.</span>
          <div className="mt-2 mt-md-0">
            <a href="#" className="footer-link me-3">Privacy</a>
            <a href="#" className="footer-link">Community Rules</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
