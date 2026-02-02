import {
  BedDouble,
  Bath,
  MapPin,
  Calendar,
  MessageCircle,
  Heart
} from "lucide-react";
import { Link } from "react-router-dom";


const FeaturedListings = () => {
  return (
    <section className="featured-listings">
      <div className="container">
        {/* Heading */}
        <div className="d-flex justify-content-between flex-wrap align-items-center mb-4">
          <div>
            <h2 className="heading text_blue">
              Featured <span className="text_theme fw-bold ">Listings</span>
            </h2>
            <p className="text-muted">
              Handpicked student housing near approved campuses
            </p>
          </div>
          <button  className="theme_outline_btn">
            View All
          </button>
        </div>

        {/* Listings */}
        <div className="row justify-content-center g-4">
          {[1, 2, 3,4].map((item) => (
            <div className="col-xxl-3 col-lg-4 col-md-6" key={item}>
            <div className="listing-card">
              <Link className="listing-image">
                <span className="featured_tag">FEATURED</span>

                <button className="save-btn">
                  <Heart size={18} />
                </button>

                <img
                  src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80"
                  alt="Listing"
                />
              </Link>

              <div className="listing-body">
                <Link><h5>Private Room Near Campus</h5></Link>
                

                <p className="listing-location">
                  University of Maryland, College Park
                </p>

                {/* Bed / Bath / Distance */}
                <div className="listing-features">
                  <span>
                    <BedDouble size={16} /> 1 Bed
                  </span>
                  <span>
                    <Bath size={16} /> 1 Bath
                  </span>
                  <span>
                    <MapPin size={16} /> 0.6 mi
                  </span>
                </div>

                {/* Price */}
                <div className="listing-price">
                  $850 <small>/ month</small>
                </div>

                {/* Actions */}
                <div className="listing-actions">
                  <button className="book-btn">
                    <Calendar size={16} /> Book Tour
                  </button>

                  <button className="contact-btn">
                    <MessageCircle size={16} /> Contact
                  </button>
                </div>
              </div>
            </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;
