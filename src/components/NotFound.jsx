import React from "react";
import { Link } from "react-router-dom";
import { Home, Search } from "lucide-react";

const NotFound = () => {
  return (
    <section className="notfound-section d-flex align-items-center">
      <div className="container text-center">

        <div className="notfound-box mx-auto">
          <h1 className="notfound-code">4<span className="text_theme">0</span>4</h1>

          <h2 className="fw-bold mb-3">
            Page Not Found
          </h2>

          <p className="text-muted mb-4">
            Sorry, the page you’re looking for doesn’t exist or has been moved.  
            Let’s help you find a room near your campus.
          </p>

          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link to="/" className="blue_btn d-flex align-items-center gap-2">
              <Home size={18} />
              Go to Homepage
            </Link>

            <Link to="/search" className="theme_outline_btn d-flex align-items-center gap-2">
              <Search size={18} />
              Browse Listings
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default NotFound;
