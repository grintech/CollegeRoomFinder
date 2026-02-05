import { useState, useRef, useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";


import {
  MapPin,
  Wifi,
  User,
  Mail,
  Phone,
  Bed,
  Bath,
  AreaChart,
  CheckCircle,
  CarIcon,
  DumbbellIcon,
  Shield,
  UtensilsCrossed,
  ShirtIcon,
  PawPrint,
  Cigarette,
  LogIn,
  Home,
  Building,
  HomeIcon,
  Eye,
  ExternalLink,
  Map,
  NavigationIcon
} from "lucide-react";
import CommuteCard from "../components/CommuteCard";
import SidebarAdSlider from "../components/SidebarAdSlider";

const PropertySinglePage = () => {
    const images = Array.from({ length: 13 }, (_, i) => i + 1);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    

    const [expanded, setExpanded] = useState(false);
    const [showToggle, setShowToggle] = useState(false);
    const textRef = useRef(null);

    useEffect(() => {
    if (textRef.current) {
        const el = textRef.current;
        setShowToggle(el.scrollHeight > el.clientHeight);
    }
    }, []);


    const amenities = [
    { label: "WiFi", icon: Wifi, active: true },
    { label: "Parking", icon: CarIcon, active: false },
    { label: "Gym/Fitness Center", icon: DumbbellIcon, active: false },
    { label: "Kitchen Access", icon: UtensilsCrossed, active: true },
    { label: "Laundry", icon: ShirtIcon, active: true },
    { label: "Security", icon: Shield, active: false },
    ];

    const address = "4207 Maryland Pl, Baltimore, MD 21229";
    const encodedAddress = encodeURIComponent(address);

  return (
    <div className="property_single">
        <div className="container py-5">
        <div className="row g-4">
            <div className="col-lg-8">
            {/* IMAGE GALLERY */}
            <div className="card shadow-sm mb-4">
                <div className="card-body">
                <div className="gallery-wrapper mb-2">
                    {/* Property type badge */}
                    <span className="property-type">Apartment</span>

                    {/* Image counter */}
                    <span className="image-count">
                        {activeIndex + 1} / {images.length}
                    </span>

                    <Swiper
                        modules={[Navigation, Thumbs]}
                        navigation
                        thumbs={{ swiper: thumbsSwiper }}
                        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                        className="main-swiper"
                    >
                        {images.map((img) => (
                        <SwiperSlide key={img}>
                            <img
                            src={`https://picsum.photos/1000/500?random=${img}`}
                            alt="property"
                            />
                        </SwiperSlide>
                        ))}
                    </Swiper>
                    </div>


                <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView="auto"
                    watchSlidesProgress
                    className="thumb-swiper"
                    >
                    {images.map((img) => (
                        <SwiperSlide key={img} className="thumb-slide">
                        <img
                            src={`https://picsum.photos/90/70?random=${img}`}
                            alt="thumb"
                        />
                        </SwiperSlide>
                    ))}
                </Swiper>

                </div>
            </div>

            

            {/* ABOUT */}
            <div className="card mb-4">
                <div className="card-body">
                    {/* PROPERTY INFO */}
                    <div className="d-flex justify-content-between flex-wrap">
                       <div>
                         <h1 className="fw-bold mb-2">Near UMBC! Female only!</h1>
                         <p className="text-muted d-flex align-items-center gap-1">
                            <MapPin size={16} /> 4207 Maryland Pl, Baltimore, MD 21229
                         </p>
                       </div>
                       <div className="text-start text-md-end">
                        <h2 className="mb-2">$1000.00</h2>
                        <p className="m-0">per month</p>
                       </div>

                    </div>

                    <div className="d-flex gap-4 my-4 flex-wrap">
                        <span className="d-flex align-items-start"> <Bed size={22} className="me-2"/> 4 Bedrooms</span>
                        <span className="d-flex align-items-start"> <Bath  size={22} className="me-2"/> 3+ Bathrooms</span>
                        <span className="d-flex align-items-start"> <AreaChart  size={22} className="me-2"/> 3000 sq ft</span>
                    </div>

                <h6 className="fw-bold">About this property</h6>

                <p
                ref={textRef}
                className={`text-muted m-0 about-text ${expanded ? "expanded" : ""}`}
                >
                ONE FEMALE ONLY! PLEASE READ THE ENTIRE DESCRIPTION BEFORE CONTACTING!
                Looking for ONE FEMALE roommate for a furnished bedroom including linens
                in a Maiden Choice/Arbutus area private single-family home. The house will
                be shared with two female UMBC students/professional and the landlord
                couple. We're looking for a kind person that respects diversity that are
                either a UMBC/UMB Ph.D., Graduate, or Junior/Senior Undergraduate student
                that are a non-smoker within the home, non-drug user, pet-free, and a tidy
                person to share a large open concept newly renovated 4 bedroom and 3.5
                bathrooms on a dead-end quiet street. If you have a medical support animal;
                no cats or shedding animals are allowed due to allergies...
                </p>

                {showToggle && (
                <button
                    className="read-toggle"
                    onClick={() => setExpanded(!expanded)}
                >
                    {expanded ? "Read less" : "Read more"}
                </button>
                )}

                </div>
            </div>

            {/* AMENITIES */}
           <div className="feature_card card mb-4">
            <div className="card-body">
                <h6 className="fw-bold mb-3">Amenities & Features</h6>

                <div className="row g-3">
                {amenities.map((item, i) => {
                    const Icon = item.icon;

                    return (
                    <div className="col-md-4 col-6" key={i}>
                        <div
                        className={`amenity-item ${
                            item.active ? "active" : "inactive"
                        }`}
                        >
                        <div className="d-flex align-items-center gap-2">
                            <Icon size={18} />
                            <span>{item.label}</span>
                        </div>

                        {item.active && (
                            <CheckCircle size={18} className="check-icon" />
                        )}
                        </div>
                    </div>
                    );
                })}
                </div>
            </div>
            </div>

            {/* RENTAL DETAILS */}
            <div className="card mb-4">
                <div className="card-body">
                <h6 className="fw-bold mb-3">Rental Terms & Details</h6>
                <div className="col-12 mb-3">
                    <ul className="row list-unstyled mb-0">
                        <div className="col-md-6">
                            <div className="d-flex items-center justify-content-between mb-2">
                                <span className="text-gray-600">Monthly Rent</span>
                                <span className="fw-semibold">$1000.00</span>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="d-flex items-center justify-content-between mb-2">
                                <span className="text-gray-600">Security Deposit</span>
                                <span className="fw-semibold">$500.00</span>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="d-flex items-center justify-content-between mb-2">
                                <span className="text-gray-600">Lease Term</span>
                                <span className="fw-semibold">Flexible</span>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="d-flex items-center justify-content-between mb-2">
                                <span className="text-gray-600">Available</span>
                                <span className="fw-semibold">Jan 21, 2026</span>
                            </div>
                        </div>
                   </ul>
                </div>

                 <div className="col-12">
                    <h6 className="fw-bold">Utilities Included</h6>
                        <ul className="row list-unstyled mb-0">
                            <div className="col-md-6">
                                <div className="d-flex items-center justify-content-between mb-2">
                                    <span className="text-gray-600">Water</span>
                                    <span className="fw-semibold"><CheckCircle size={18} className="text-success" /></span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="d-flex items-center justify-content-between mb-2">
                                    <span className="text-gray-600">Electricity</span>
                                    <span className="fw-semibold"><CheckCircle size={18} className="text-success" /></span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="d-flex items-center justify-content-between mb-2">
                                    <span className="text-gray-600">Gas</span>
                                    <span className="fw-semibold"><CheckCircle size={18} className="text-success" /></span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="d-flex items-center justify-content-between mb-2">
                                    <span className="text-gray-600">Internet</span>
                                    <span className="fw-semibold"><CheckCircle size={18} className="text-success" /></span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="d-flex items-center justify-content-between mb-2">
                                    <span className="text-gray-600">Cable</span>
                                    <span className="fw-semibold"><CheckCircle size={18} className="text-success" /></span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="d-flex items-center justify-content-between mb-2">
                                    <span className="text-gray-600">Heat</span>
                                    <span className="fw-semibold"><CheckCircle size={18} className="text-success" /></span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="d-flex items-center justify-content-between mb-2">
                                    <span className="text-gray-600">AC</span>
                                    <span className="fw-semibold"><CheckCircle size={18} className="text-success" /></span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="d-flex items-center justify-content-between mb-2">
                                    <span className="text-gray-600">Wi</span>
                                    <span className="fw-semibold"><CheckCircle  size={18} className="text-success"/></span>
                                </div>
                            </div>
                           
                        </ul>
                 </div>

                </div>
            </div>

              <div className="card">
                <div className="card-body">
                <h6 className="fw-bold mb-3">Property Policies</h6>
                <div className="row">
                    <div className="col-sm-6">
                        <ul className="list-unstyled mb-0">
                            <div className="d-flex items-center justify-content-between mb-2">
                                <div className="d-flex align-items-baseline gap-2">
                                    <span className="text-gray-600"><PawPrint /> </span>
                                    <div>
                                        <span className="fw-semibold">Pet Policy</span>
                                        <p className="mt-2">No Pets</p>
                                    </div>
                                </div>
                            </div>
                           
                        </ul>
                    </div>
                    <div className="col-sm-6">
                        <ul className="list-unstyled mb-0">
                            <div className="d-flex items-center justify-content-between mb-2">
                                <div className="d-flex align-items-baseline gap-2">
                                    <span className="text-gray-600"><Cigarette /> </span>
                                    <div>
                                        <span className="fw-semibold">Smoking Policy</span>
                                        <p className="mt-2">No Smoking</p>
                                    </div>
                                </div>
                            </div>
                           
                        </ul>
                    </div>
                   
                </div>
                </div>
            </div>

         </div>

            {/* RIGHT SIDEBAR */}
            <div className="col-lg-4">
                {/* OWNER CARD */}
                <div className="card mb-4">
                    <div className="card-body">
                    <h6 className="fw-bold mb-4">Property Owner</h6>
                    <div className="d-flex align-items-center gap-3 mb-3">
                        <div className="owner_img">
                        {/* <img src="" className="" alt="owner image" />   */}
                         <User />    
                        </div>
                        <div>
                            <h6 className="owner_name">Lisa Whittle</h6>
                        <p className="m-0"><Building className="me-1" size={16} /> Individual Owner</p>
                        </div>
                    </div>
                    <p className="text-muted small mb-2">I work at UMBC for 30 years.</p>
                    <p className=" mb-1 d-flex align-items-center gap-1">
                        <HomeIcon size={16}  className="me-1"/> 1 property listed
                    </p>
                    <p className=" mb-1 d-flex align-items-center gap-1">
                        <Mail size={16}  className="me-1"/> whittle@umbc.edu
                    </p>
                    <p className=" mb-0 d-flex align-items-center gap-1">
                        <Phone size={16}  className="me-1"/> 410-999-4668
                    </p>
                    </div>
                </div>

                {/* CTA */}
                <div className="card mb-4">
                <div className="card-body ">
                <h6 className="fw-bold mb-4">Get in Touch</h6>
                    <div className="d-flex flex-column text-center gap-3">
                        <button className="blue_btn w-100  d-flex justify-content-center align-items-center">
                        <Home  className="me-2" size={20}/> Submit Interest
                        </button>
                        <button className="theme_outline_btn w-100 d-flex justify-content-center align-items-center">
                        <LogIn className="me-2" size={20} /> Sign in to Message
                        </button>
                        <p className="small  m-0">Have questions? Message the landlord directly.</p>
                    </div>
                    </div>
                </div>

                {/* AD SLIDER */}
                <SidebarAdSlider />

                {/* QUICK FACTS */}
                <div className="card mb-4">
                    <div className="card-body">
                    <h6 className="fw-bold mb-4">Quick Facts</h6>
                        <div className="d-flex align-items-center justify-content-between mb-2">
                            <span className="text-gray-600">Property type</span>
                            <span className="fw-semibold badge text-bg-light">Apartment</span>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mb-2">
                            <span className="text-gray-600">Square Feet</span>
                            <span className="fw-semibold">3000 sq ft</span>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mb-2">
                            <span className="text-gray-600">Bedrooms</span>
                            <span className="fw-semibold">4</span>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mb-2">
                            <span className="text-gray-600">Bathrooms</span>
                            <span className="fw-semibold">3+</span>
                        </div>
                    </div>
                </div>

                <div className="card mb-4 location-card">
                    <div className="card-body">

                        {/* Header */}
                        <div className="d-flex align-items-center justify-content-between mb-2">
                        <div className="d-flex align-items-center gap-2">
                            <MapPin size={18}  />
                            <h6 className="fw-bold mb-0">Location</h6>
                        </div>

                        <div className="d-flex align-items-center gap-3 small">
                            {/* <span className="text-muted d-flex align-items-center gap-1">
                            <Eye size={14} /> Street View
                            </span> */}

                            <span className="badge bg-warning-subtle text_orange text-warning fw-semibold">
                            UMBC
                            </span>
                            {/* <ExternalLink size={16} className="text-muted" /> */}
                        </div>
                        
                        </div>

                        {/* Address */}
                        <p className="text-muted small mb-3">
                        {address}
                        </p>

                        {/* Google Map iframe */}
                        <div className="map-wrapper mb-3">
                        <iframe
                            title="property-location"
                            src={`https://www.google.com/maps?q=${encodedAddress}&output=embed`}
                            width="100%"
                            height="220"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                        </div>

                        {/* Footer Buttons */}
                        <div className="d-flex gap-2">
                        <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-light w-100 d-flex align-items-center justify-content-center gap-2"
                        >
                            <Map size={16} /> Open in Maps
                        </a>

                        <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-light w-100 d-flex align-items-center justify-content-center gap-2"
                        >
                            <NavigationIcon size={16} /> 
                            Directions to UMBC
                        </a>
                        </div>

                    </div>
                </div>

                <CommuteCard />


            </div>
        </div>
        </div>

    </div>
  );
};



export default PropertySinglePage;
