import { Users, MessageCircle, Home, Search, Building, GraduationCap } from "lucide-react";
import { useState } from "react";
import WaitlistModal from "./WaitlistModal";
import { Link } from "react-router-dom";

const Hero = () => {
   const [showWaitlist, setShowWaitlist] = useState(false);
   
  return (
    <>
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-6 col-xxl-5">
              <div className="hero_left">
                <h1>
              Campus-Approved <span>Rooms & Units,</span> <br />
              All in One Place
              </h1>

              <p className="text-white">
              College Room Finder is a student-only housing marketplace that connects you with verified hosts offering rooms and units near approved college campuses. Every listing is campus-restricted to ensure safety, convenience, and relevance—so you can find a comfortable place to live close to your college without the usual hassle.
              </p>

              <div className="hero-buttons ">
              
                <Link to="/login" className="light_btn d-flex align-items-center gap-2">
                  <Home size={18} />
                  List Your Property
                </Link>
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

            <div className="col-xl-6 col-xxl-7 text-center bg-white rounded-circle">
              {/* <img src="/images/hero.jpg" alt="students" className="hero-img  rounded-top-4" /> */}
              <img src="/images/hero2.png" alt="students" className="hero-img  rounded-top-4" />
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
