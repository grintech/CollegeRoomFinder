import { Users, MessageCircle, Home, Search, Building, GraduationCap } from "lucide-react";
import { useState } from "react";
import WaitlistModal from "./WaitlistModal";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Hero = () => {
   const [showWaitlist, setShowWaitlist] = useState(false);
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
    <>
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center px-md-3">
             <div className="col-xl-6 col-xxl-6 order-2 order-xl-1 text-center  overflow-hidden">
              <img src="/images/about4.png" alt="students" className="hero-img  " />
            </div>
            <div className="col-xl-6 col-xxl-5 offset-xxl-1 order-1 order-xl-2">
              <div className="hero_left">
                <h1>
              Find <span>Rooms & Units,</span> {''}
              All in One Place
              </h1>

              <p className="text-white">
              College Room Finder is a student-only housing marketplace that connects you with verified hosts offering rooms and units near approved college campuses. Every listing is campus-restricted to ensure safety, convenience, and relevance—so you can find a comfortable place to live close to your college without the usual hassle.
              </p>

              <div className="hero-buttons ">
              
                <button
                  className="light_btn d-flex align-items-center gap-2"
                  onClick={handleListProperty}
                >
                  <Home size={18} />
                  List Your Property
                </button>

                <button
                  className="theme_outline_btn d-flex align-items-center gap-2"
                  onClick={() => setShowWaitlist(true)}
                >
                  <GraduationCap size={18} />
                  List Your University
                </button>

              </div>

              </div>
            </div>

           
          </div>
        </div>
      </section>

       <WaitlistModal
        show={showWaitlist}
        onClose={() => setShowWaitlist(false)}
      />

    </>
  );
};

export default Hero;
