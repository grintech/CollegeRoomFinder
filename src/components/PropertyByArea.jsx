// src/components/PropertyByArea.jsx
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { BedDouble, Bath, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";

/* ---------- UNIVERSITY TABS ---------- */
const universityTabs = [
  { key: "Alabama", label: "Alabama" },
  { key: "TexasA&M", label: "Texas A&M" },
  { key: "Harvard", label: "Harvard" },
  { key: "NotreDame", label: "Notre Dame" },
  { key: "Michigan", label: "Michigan" },
  { key: "USC", label: "USC" },
  // { key: "PennState", label: "Penn State" },
  // { key: "Florida", label: "Florida" },
  // { key: "FSU", label: "Florida State" },
  // { key: "Miami", label: "Miami" },
  { key: "UMD_CP", label: "UMD CP" },
  { key: "UMBC", label: "UMBC" },
  { key: "Towson", label: "Towson" },
  { key: "Bowie", label: "Bowie State" },
  { key: "Morgan", label: "Morgan State" },
];

/* ---------- LISTINGS DATA ---------- */
const listingsData = [
  {
    id: 1,
    title: "Private Room Near Campus",
    uniKey: "Harvard",
    address: "Harvard University, Cambridge, MA",
    beds: 1,
    baths: 1,
    distance: "0.4 mi",
    price: 2400,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    featured: true,
  },
  {
    id: 2,
    title: "Shared Apartment",
    uniKey: "Alabama",
    address: "University of Alabama, Tuscaloosa, AL",
    beds: 2,
    baths: 1,
    distance: "0.6 mi",
    price: 850,
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
    featured: true,
  },
  {
    id: 3,
    title: "Studio Near Engineering",
    uniKey: "TexasA&M",
    address: "Texas A&M University, College Station, TX",
    beds: 1,
    baths: 1,
    distance: "0.3 mi",
    price: 1450,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
    featured: true,
  },
  {
    id: 4,
    title: "2BR Walk to Campus",
    uniKey: "Michigan",
    address: "University of Michigan, Ann Arbor, MI",
    beds: 2,
    baths: 2,
    distance: "0.5 mi",
    price: 2100,
    image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c",
    featured: true,
  },
  {
    id: 5,
    title: "Furnished Apartment",
    uniKey: "USC",
    address: "University of Southern California, Los Angeles, CA",
    beds: 2,
    baths: 2,
    distance: "0.7 mi",
    price: 2600,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    featured: true,
  },
  {
    id: 6,
    title: "Private Room Near Library",
    uniKey: "UMBC",
    address: "University of Maryland, Baltimore County, MD",
    beds: 1,
    baths: 1,
    distance: "0.4 mi",
    price: 780,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
    featured: true,
  },
  {
    id: 7,
    title: "Townhouse Near Campus",
    uniKey: "Towson",
    address: "Towson University, Towson, MD",
    beds: 3,
    baths: 2,
    distance: "0.8 mi",
    price: 1800,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    featured: true,
  },
  {
    id: 8,
    title: "Student Housing",
    uniKey: "Morgan",
    address: "Morgan State University, Baltimore, MD",
    beds: 2,
    baths: 1,
    distance: "0.6 mi",
    price: 950,
    image: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4",
    featured: true,
  },
];

const PropertyByArea = () => {
  const [activeTab, setActiveTab] = useState("all");

  const filteredListings =
    activeTab === "all"
      ? listingsData
      : listingsData.filter(
          (l) => l.uniKey === activeTab
        );

  return (
    <section className="property_by_area">
      <div className="container">

        {/* Heading */}
        <div className="text-center mb-4">
          <h4 className="heading text_blue">
            Paid {" "}
            <span className="text_theme fw-semibold">
              Featured Listings{" "}
            </span>
             By Host
          </h4>
        </div>

        {/* Tabs */}
        <ul className="nav nav-tabs justify-content-center flex-wrap mb-4 w-100">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "all" ? "active" : ""}`}
              onClick={() => setActiveTab("all")}
            >
              ALL
            </button>
          </li>

          {universityTabs.map((u) => (
            <li key={u.key} className="nav-item">
              <button
                className={`nav-link ${
                  activeTab === u.key ? "active" : ""
                }`}
                onClick={() => setActiveTab(u.key)}
              >
                {u.label}
              </button>
            </li>
          ))}
        </ul>

        {filteredListings.length === 0 && (
  <div className="text-center py-5">
    <h6 className="text-muted">
      No listings available currently
    </h6>
  </div>
)}

        {/* Listings Slider */}
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 1 },
            576: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            992: { slidesPerView: 4 },
          }}
        >
          {filteredListings.map((listing) => (
            <SwiperSlide key={listing.id}>
              <div className="listing-card">

                <Link to={`/property/${listing.title}`} className="listing-image">
                  {listing.featured && (
                    <span className="featured_tag">
                      FEATURED
                    </span>
                  )}
                  <img src={listing.image} alt={listing.title} />
                </Link>

                <div className="listing-body">
                  <h6 className="fw-bold text-truncate">
                    {listing.title}
                  </h6>

                  {/* FULL ADDRESS */}
                  <p className="listing-location text-truncate">
                    <MapPin size={14} /> {listing.address}
                  </p>

                  <div className="d-flex gap-3 small mb-2">
                    <span><BedDouble size={14} /> {listing.beds}</span>
                    <span><Bath size={14} /> {listing.baths}</span>
                    <span>{listing.distance}</span>
                  </div>

                  <h5 className="fw-bold text_blue">
                    ${listing.price} <small>/ month</small>
                  </h5>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
};

export default PropertyByArea;
