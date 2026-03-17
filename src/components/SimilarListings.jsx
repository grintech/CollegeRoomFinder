import { BedDouble, Bath, MapPin, Home } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import SimilarListingSkeleton from "./skeletons/SimilarListingSkeleton";

const SimilarListings = ({ propertySlug }) => {

  const [similarListings, setSimilarListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const slugify = (text) => {
   return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "") 
      .replace(/\s+/g, "-");          
  }

  useEffect(() => {
    const fetchSimilarListings = async () => {
      try {
        setLoading(true);

        const response = await api.get(`/similar/${propertySlug}`);
        const result = response.data;

        if (result?.status === true) {
          setSimilarListings(result?.similar_listings || []);
        }

      } catch (error) {
        console.error("Error fetching similar listings:", error);
      } finally {
        setLoading(false);
      }
    };

    if (propertySlug) {
      fetchSimilarListings();
    }

  }, [propertySlug]);

  return (
    <section className="featured-listings p-0 mt-5">
      <div className="container">

        {/* Heading */}
        <div className="d-flex justify-content-between flex-wrap align-items-center mb-4">
          <div>
            <h2 className="heading text_blue">
              Similar <span className="text_theme fw-bold">Listings</span>
            </h2>
            <p className="text-muted">
              Handpicked student housing near approved campuses
            </p>
          </div>
        </div>

        <div className="row  g-4">

          {/* Loading */}
          {loading && (
            // <div className="text-center">Loading similar listings...</div>
              [...Array(4)].map((_, index) => (
                <SimilarListingSkeleton key={index} />
              ))
          )}

          {/* Listings */}
          {!loading && similarListings.slice(0,4).map((listing) => (
            <div
              className="col-xxl-3 col-lg-4 col-md-6"
              key={listing.id}
            >
              <div className="listing-card">

                <Link
                  className="listing-image"
                  to={`/property/${slugify(listing.slug)}`}
                >
                  {listing.is_featured && (
                    <span className="featured_tag">FEATURED</span>
                  )}

                  <img
                    src={
                      listing?.primary_image?.image_url ||
                      "/images/image_not_found.png"
                    }
                    alt={listing.title}
                  />
                </Link>

                <div className="listing-body">

                  <Link to={`/property/${slugify(listing.slug)}`}>
                    <h5 className="text-truncate">
                      {listing.title}
                    </h5>
                  </Link>

                  <p className="listing-location">
                    {listing?.campus?.name}
                  </p>

                  {/* Features */}
                  <div className="listing-features">
                    <span>
                      <BedDouble size={16} /> {listing.bedrooms || 0} {listing.bedrooms === 1 ? "Bed" : "Beds"}
                    </span>

                    <span>
                      <Bath size={16} /> {listing.bathrooms || 0} {listing.bathrooms === 1 ? "Bath" : "Baths"}
                    </span>

                    <span>
                      <MapPin size={16} /> {listing.city}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="listing-price">
                    ${listing.price}
                    <small> / Month</small>
                  </div>

                </div>
              </div>
            </div>
          ))}

          {/* Empty */}
          {!loading && similarListings.length === 0 && (
            <div className="col-12 rounded-3 shadow-sm text-center bg-white p-4">
              <Home size={40} className="text_theme" />
              <h6 className="text-center text_theme mt-3 mb-0">
                No similar listings found.
              </h6>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default SimilarListings;