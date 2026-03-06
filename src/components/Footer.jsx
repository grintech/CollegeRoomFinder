import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Footer = () => {

  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const WEBSITE_URL = import.meta.env.VITE_WEBSITE_URL;
  // console.log(WEBSITE_URL);

  const goToListProperty = () => {

    if (!isAuthenticated) {
      navigate("/login")
      return
    }

    if (user?.role !== "host") {
      toast.error("This page is only available for hosts")
      return
    }

    window.location.href = `${WEBSITE_URL}/host/listings/create-listing`
  }

  const goToMyListings = () => {

    if (!isAuthenticated) {
      navigate("/login")
      return
    }

    if (user?.role !== "host") {
      toast.error("This page is only available for hosts")
      return
    }

    window.location.href = `${WEBSITE_URL}/host/listings`
  }



  return (
    <footer className="footer-section pt-5">
      <div className="container">

        <div className="row align-items-baseline gy-4">

          <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-6 text-start">
            <Link to="/" className="navbar-brand d-flex align-items-center gap-2" >
              <img src="/images/logo_new.png" alt="logo" width={180} />
            </Link>
             <p className="mt-3 footer-text">
              Find verified rooms near colleges. Simple, safe, and student-friendly.
             </p>

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
              <li><Link to="/contacted-hosts" className="footer-link">My Enquiries</Link></li>
              <li><Link to="/saved-listings" className="footer-link">Saved Properties</Link></li>
            </ul>
          </div>

          {/* HOSTS */}
          <div className="col-xxl-2 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6 text-start">
            <h6 className="footer-title">For Hosts</h6>
            <ul className="list-unstyled">
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); goToListProperty(); }}
                  className="footer-link"
                  > 
                    List Property
                </a>
              </li>
              <li>
                 <a href="#" onClick={(e) => { e.preventDefault(); goToMyListings(); }}
                  className="footer-link"
                   >
                       My Listings
                 </a>
              </li>
              <li><Link to="/hosts?scroll=pricing" className="footer-link">Pricing Plans</Link></li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div className="col-xxl-2 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6 text-start">
            <h6 className="footer-title">Support</h6>
            <ul className="list-unstyled">
              <li><Link to="/privacy-policy" className="footer-link">Privacy Policy</Link></li>
              <li><Link to="/terms-and-conditions" className="footer-link">Terms & Conditions</Link></li>
              <li><Link to="/community-rules" className="footer-link">Community Rules</Link></li>
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
        <div className="d-flex flex-column flex-md-row justify-content-center align-items-center small footer-bottom mb-3 mb-md-4">
          <span className="text-center">© 2026 CollegeRoomFinder. All Rights Reserved.</span>
         
        </div>

      </div>
    </footer>
  );
};

export default Footer;
