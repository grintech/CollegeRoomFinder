import {
  BedDouble,
  Bath,
  MapPin,
  Calendar,
  MessageCircle,
  Heart,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import ContactHostModal from "./ContactHostModal";
import BookTourModal from "./BookTourModal";

/* --------  LISTING DATA -------- */
const listingsData = [
  {
    id: 1,
    title: "Private Room Near Campus",
    university: "University of Maryland, College Park",
    beds: 1,
    baths: 1,
    distance: "0.6 mi",
    price: 850,
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80",
    availabilityTill: new Date(2026, 3, 20),
    totalBeds: 2,
    waitTime: "~2 week avg. wait",
    featured: true,
  },
  {
    id: 2,
    title: "2BR Near Law School",
    university: "Harvard University",
    beds: 2,
    baths: 1,
    distance: "0.4 mi",
    price: 2400,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    availabilityTill: new Date(2026, 5, 10),
    totalBeds: 2,
    waitTime: "~1 week avg. wait",
    featured: true,
  },
  {
    id: 3,
    title: "Shared Apartment Near Downtown",
    university: "UCLA",
    beds: 3,
    baths: 2,
    distance: "1.1 mi",
    price: 1200,
    image:
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
    availabilityTill: new Date(2026, 1, 15),
    totalBeds: 3,
    waitTime: "~3 week avg. wait",
    featured: false,
  },
  {
    id: 4,
    title: "Studio Near Engineering Campus",
    university: "University of Texas, Austin",
    beds: 1,
    baths: 1,
    distance: "0.3 mi",
    price: 1450,
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    availabilityTill: new Date(2026, 6, 5),
    totalBeds: 1,
    waitTime: "~1.5 week avg. wait",
    featured: true,
  },
];

const FeaturedListings = () => {
  const [showContact, setShowContact] = useState(false);
  const [showTour, setShowTour] = useState(false);
  const [activeListing, setActiveListing] = useState(null);
  const [savedListings, setSavedListings] = useState({});

  const toggleSave = (id) => {
    setSavedListings((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const slugify = (text) => {
   return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "") 
      .replace(/\s+/g, "-");          
  }


  return (
    <>
      <section className="featured-listings">
        <div className="container">
          {/* Heading */}
          <div className="d-flex justify-content-between flex-wrap align-items-center mb-4">
            <div>
              <h2 className="heading text_blue">
                Featured{" "}
                <span className="text_theme fw-bold">Listings</span>
              </h2>
              <p className="text-muted">
                Handpicked student housing near approved campuses
              </p>
            </div>
            <button className="theme_outline_btn">View All</button>
          </div>

          {/* Listings */}
          <div className="row justify-content-center g-4">
            {listingsData.map((listing) => (
              <div
                className="col-xxl-3 col-lg-4 col-md-6"
                key={listing.id}
              >
                <div className="listing-card">
                  <Link className="listing-image" to={`/property/${slugify(listing.title)}`}>
                    {listing.featured && (
                      <span className="featured_tag">FEATURED</span>
                    )}

                    <button
                      className={`save-btn ${
                        savedListings[listing.id] ? "active" : ""
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        toggleSave(listing.id);
                      }}
                    >
                      <Heart
                        size={18}
                        fill={
                          savedListings[listing.id]
                            ? "var(--blue)"
                            : "none"
                        }
                        stroke={
                          savedListings[listing.id]
                            ? "var(--blue)"
                            : "#000"
                        }
                      />
                    </button>

                    <img
                      src={listing.image}
                      alt={listing.title}
                    />
                  </Link>

                  <div className="listing-body">
                    <Link to={`/property/${slugify(listing.title)}`}>
                      <h5 className="text-truncate">{listing.title}</h5>
                    </Link>

                    <p className="listing-location">
                      {listing.university}
                    </p>

                    {/* Features */}
                    <div className="listing-features">
                      <span>
                        <BedDouble size={16} /> {listing.beds} Bed
                      </span>
                      <span>
                        <Bath size={16} /> {listing.baths} Bath
                      </span>
                      <span>
                        <MapPin size={16} /> {listing.distance}
                      </span>
                    </div>

                    {/* Price */}
                    <div className="listing-price">
                      ${listing.price}{" "}
                      <small>/ month</small>
                    </div>

                    {/* Actions */}
                    <div className="listing-actions">
                      <button
                        className="book-btn"
                        onClick={() => {
                          setActiveListing(listing);
                          setShowTour(true);
                        }}
                      >
                        <Calendar size={16} /> Book Tour
                      </button>

                      <button
                        className="contact-btn"
                        onClick={() => {
                          setActiveListing(listing);
                          setShowContact(true);
                        }}
                      >
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

      {/* Modals */}
      <ContactHostModal
        show={showContact}
        onClose={() => setShowContact(false)}
        listing={activeListing}
      />

      <BookTourModal
        show={showTour}
        onClose={() => setShowTour(false)}
        listing={activeListing}
      />
    </>
  );
};

export default FeaturedListings;
