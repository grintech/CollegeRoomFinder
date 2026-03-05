import { BedDouble, Bath, MapPin, Calendar, MessageCircle, Heart, Home,} from "lucide-react";
import {Link} from 'react-router-dom'
import { LISTINGS } from "../../components/ListingData";
import { useEffect, useState } from "react";
import DashSidebar from './DashSidebar'
import ContactHostModal from "../../components/ContactHostModal";
import BookTourModal from "../../components/BookTourModal";
import ListingSkeleton from "../../components/skeletons/ListingSkeleton";


const SavedListings = () => {

      const [savedListings, setSavedListings] = useState({});
       const [showContact, setShowContact] = useState(false);
       const [activeListing, setActiveListing] = useState(null);
       const [showTour, setShowTour] = useState(false);
       const [loading, setLoading] = useState(true);
       const [results, setResults] = useState([]);
    
    //   const results = LISTINGS.filter((item) => item.isSaved === true);

        useEffect(() => {
        // simulate API delay (remove this when using real API)
        setTimeout(() => {
            const saved = LISTINGS.filter((item) => item.isSaved === true);
            setResults(saved);
            setLoading(false);
        }, 1000); // 0.8s delay
        }, []);
    
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
         <div className="my_account min_height">
            <div className="container py-4">
                <div className="row">
                    <h1 className="mb-3 sec-title text-center">Saved Listings <span className="text_blue">({results.length})</span> </h1>
                    <div className="col-lg-4 col-xl-3 mb-4 mb-lg-0">
                        
                        <DashSidebar />
                    </div>
                    <div className="col-lg-8 col-xl-9 mb-4 mb-lg-0 ">
                     

                    <div className="row g-4">
                        {loading ? (
                            <ListingSkeleton count={6} />
                        ) : results.length ? (
                            results.map((item) => (
                                <div className="col-xxl-4 col-md-6" key={item.id}>
                                <div className="listing-card">
                                    <Link to={`/property/${slugify(item.title)}`} className="listing-image">
                                    {/* <button
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
                                    </button> */}

                                    <button
                                    className={`save-btn ${item.isSaved ? "active" : ""}`}
                                    >
                                    <Heart
                                        size={18}
                                        fill={item.isSaved ? "var(--blue)" : "none"}
                                        color={item.isSaved ? "var(--blue)" : "#333"}
                                    />
                                    </button>

                                    <img src={item.image} alt={item.title} />
                                    </Link>

                                    <div className="listing-body">
                                    <Link to={`/property/${slugify(item.title)}`} > <h5>{item.title}</h5> </Link>
                                    <p className="listing-location">
                                        {item.university}
                                    </p>

                                    <div className="listing-features">
                                        <span><BedDouble size={16} /> {item.beds} Bed</span>
                                        <span><Bath size={16} /> {item.baths} Bath</span>
                                        <span><MapPin size={16} /> {item.distance} mi</span>
                                    </div>

                                    <div className="listing-price mb-0">
                                        ${item.price} <small>/ month</small>
                                    </div>

                                    {/* <div className="listing-actions">
                                        <button className="book-btn" 
                                        onClick={() => {
                                        setActiveListing(item);
                                        setShowTour(true);
                                        }}
                                        >
                                        <Calendar size={16} /> Book Tour
                                        </button>
                                        <button className="contact-btn" 
                                            onClick={() => {
                                            setActiveListing(item);
                                            setShowContact(true);
                                            }}
                                        >
                                        <MessageCircle size={16} /> Contact
                                        </button>
                                    </div> */}

                                    </div>
                                </div>
                                </div>
                            ))
                            ) : (
                            <div className="col-12 rounded-3 shadow-sm text-center bg-white p-4 ">
                            <Home size={40} className="text_theme" /> 
                            <h6 className="text-center text_theme mt-3 mb-0">You haven’t saved any listings yet.</h6>
                        </div>
                        )}
                    </div>


                    </div>
                </div>
            </div>
        </div>

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
  )
}

export default SavedListings