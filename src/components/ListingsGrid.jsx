import { BedDouble, Bath, MapPin, Calendar, MessageCircle, Heart, Home,} from "lucide-react";
import {Link} from 'react-router-dom'
import { LISTINGS } from './ListingData.js'
import { useState } from "react";


const ListingsGrid = ({ filters }) => {
   const [savedListings, setSavedListings] = useState({});


  if (!filters) return null;

  const results = LISTINGS.filter((item) => {
    return (
      (!filters.university ||
        item.university
          .toLowerCase()
          .includes(filters.university.toLowerCase())) &&
      item.price <= filters.maxPrice &&
      item.beds >= filters.minBeds
    );
  });

  const toggleSave = (id) => {
  setSavedListings((prev) => ({
    ...prev,
    [id]: !prev[id],
  }));
};


  return (
    <section className="home_listings ">
      <div className="container">
        {results.length > 0 && (
            <div className="mb-4">
                <h5 className=" text_blue text-center">
                    {results.length} Room{results.length !== 1 && "s"} Available
                    {filters.university && (
                    <>
                        {" "} Near <strong className="">{filters.university}</strong>
                    </>
                    )}
                </h5>
            </div>
        )}


        <div className="row g-4">
          {results.length ? (
            // results.slice(0,6).map((item) => (
            results.map((item) => (
              <div className="col-lg-4 col-md-6" key={item.id}>
                <div className="listing-card">
                  <Link className="listing-image">
                    <button
                    className={`save-btn ${savedListings[item.id] ? "active" : ""}`}
                    onClick={(e) => {
                        e.preventDefault(); 
                        toggleSave(item.id);
                    }}
                    >
                    <Heart
                        size={18}
                        fill={savedListings[item.id] ? "var(--blue)" : "none"}
                        color={savedListings[item.id] ? "var(--blue)" : "#333"}
                    />
                    </button>

                    <img src={item.image} alt={item.title} />
                  </Link>

                  <div className="listing-body">
                    <Link> <h5>{item.title}</h5> </Link>
                     <p className="listing-location">
                      {item.university}
                     </p>

                    <div className="listing-features">
                      <span><BedDouble size={16} /> {item.beds} Bed</span>
                      <span><Bath size={16} /> {item.baths} Bath</span>
                      <span><MapPin size={16} /> {item.distance} mi</span>
                    </div>

                    <div className="listing-price">
                      ${item.price} <small>/ month</small>
                    </div>

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
            ))
          ) : (
              <div className="col-12 rounded-3 shadow-sm text-center bg-white p-4 ">
                 <Home size={40} className="text_theme" /> 
                 <h6 className="text-center text_theme mt-3 mb-0"> No rooms match your filters.Try adjusting them above. </h6>
             </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ListingsGrid;
