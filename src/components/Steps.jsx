import React from "react";
import { UserCheck, Users, CheckCircle, Search, Home } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const stepsData = [
  {
    id: 1,
    title: "Find Your Home",
    description:
      "Browse verified student housing near your campus. Compare rooms, prices, and amenities to choose a home that fits your budget.",
    icon: <i className="fi fi-rr-home"></i>,
    colorClass: "blue-step",
  },
  {
    id: 2,
    title: "Sign Your Lease",
    description:
      "Connect directly with trusted hosts near your college. Review rental details carefully and sign your lease securely with full clarity.",
    icon: <i className="fi fi-rr-file-signature"></i>,
    colorClass: "red-step",
  },
  {
    id: 3,
    title: "Move Your Stuff",
    description:
      "Prepare for a smooth move into your new student home. Settle in comfortably and focus fully on your college life from day one.",
    icon: <i className="fi fi-rr-box-open"></i>,
    colorClass: "blue-step",
  },
];


const Steps = () => {

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
    <section className="finding_steps">
      <div className="container">
        
        <div className="text-center mb-5">
          <h2 className="heading">
            Find Your Room In <span className="text_blue fw-bold">3 Easy Steps</span>
          </h2>
          <p className="subheading text-muted">
            Designed for college students to find the right place at the best price.
          </p>
        </div>

        <div className="steps-wrapper">
          {stepsData.map((step, index) => (
         

          <div className={`step-card-container ${step.colorClass}`} key={index}>
            <div className="step-outline">
              <div className="step-bg-layer"></div>

              <div className="step-card">
                        <div className="step-number-circle">
                          <span>{step.id}</span>
                        </div>

                        <div className="step-content">
                          <h5>{step.title}</h5>
                          <p>{step.description}</p>
                        </div>

                        <div className="step-icon-box">
                          {step.icon}
                        </div>
                      </div>
            </div>

            {index < stepsData.length - 1 && <div className="step-arrow"></div>}
          </div>


          ))}
        </div>

        <div className="steps-cta d-flex justify-content-center gap-3 mt-5">
             <Link to="/?scroll=hero_search" className="theme_outline_btn d-flex align-items-center gap-2">
                <Search size={18} />
                Search Listings
              </Link>

              <button onClick={handleListProperty} className="dark_btn d-flex align-items-center gap-2">
                <Home size={18} />
                List Your Property
              </button>
        </div>
      </div>
    </section>
  );
};

export default Steps;