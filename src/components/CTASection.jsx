import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const CTASection = () => {

  const {user} = useAuth();
  const navigate = useNavigate();
  const WEBSITE_URL = import.meta.env.VITE_WEBSITE_URL;
  
  const handleListProperty = () => {
  
   if (!user) {
   navigate(`/login`);
     return;
   }
  
   if (user?.role === "student") {
     toast.error("Login as host to list property");
     return;
   }
  
   if (user?.role === "host") {
     window.location.replace(`${WEBSITE_URL}/host/listings/create-listing`);
   } 
   else if (user?.role === "admin") {
     window.location.replace(`${WEBSITE_URL}/admin/listings/create-listing`);
   }
  
  };

  
  return (
    <section className="cta-section">
      <div className="cta-overlay">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-9">
              <h2 className="cta-heading">
                Campus-Approved Housing,
                <br />
                <span>Built for Students & Hosts</span>
              </h2>

              <p className="cta-text">
                Students can find verified rooms and units near their campus.
                Hosts can reach trusted student renters — all in one platform.
              </p>

              <div className="cta-buttons">
                <Link to="/?scroll=hero_search"  className="theme_outline_btn ">
                  Find a Room
                </Link>

                 <button onClick={handleListProperty}  className="light_btn"> List Your Property </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
