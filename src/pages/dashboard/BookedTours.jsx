import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import DashSidebar from "./DashSidebar";
import { Calendar, Clock, User, MapPin, BedDouble, Bath, Home } from "lucide-react";

const BookedTours = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("upcoming");

  const tours = [
    {
      id: 1,
      title: "Cozy Studio Near Campus",
      location: "University District",
      price: "$750/mo",
      beds: 1,
      baths: 1,
      distance:0.5,
      host: "John Smith",
      tourType: "In-Person",
      date: "Mar 13, 2026",
      time: "10:00 AM",
      status: "upcoming",
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
    },
    {
      id: 2,
      title: "Modern Student Apartment",
      location: "Downtown",
      price: "$820/mo",
      beds: 2,
      baths: 1,
      distance:0.5,
      host: "Emma Wilson",
      tourType: "Virtual",
      date: "Mar 16, 2026",
      time: "2:30 PM",
      status: "upcoming",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
    },
    {
      id: 3,
      title: "Shared Room Near Library",
      location: "Campus West",
      price: "$550/mo",
      beds: 1,
      baths: 1,
      distance:0.5,
      host: "David Brown",
      tourType: "In-Person",
      date: "Feb 28, 2026",
      time: "11:00 AM",
      status: "completed",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    },
    {
      id: 4,
      title: "Luxury Studio Apartment",
      location: "City Center",
      price: "$980/mo",
      beds: 1,
      baths: 1,
      distance:0.5,
      host: "Sophia Taylor",
      tourType: "Virtual",
      date: "Feb 25, 2026",
      time: "4:00 PM",
      status: "completed",
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
    },
  ];

  const filteredTours = tours.filter((tour) => tour.status === activeTab);

  return (
    <div className="my_account min_height">
      <div className="container py-4">
        <div className="row">
             <h1 className="mb-3 sec-title text-center">Your Property Tours <span className="text_blue">({tours.length})</span> </h1>

          {/* Sidebar */}
          <div className="col-lg-4 col-xl-3 mb-4 mb-lg-0">
            <DashSidebar />
          </div>

          {/* Main */}
          <div className="col-lg-8 col-xl-9">

            {filteredTours.length > 0 && (
                <div className="tour_tabs">
                    <ul className="nav nav-tabs mb-4">
                    <li className="nav-item">
                        <button
                        className={`nav-link ${activeTab === "upcoming" ? "active" : ""}`}
                        onClick={() => setActiveTab("upcoming")}
                        >
                        Upcoming Tours
                        </button>
                    </li>

                    <li className="nav-item">
                        <button
                        className={`nav-link ${activeTab === "completed" ? "active" : ""}`}
                        onClick={() => setActiveTab("completed")}
                        >
                        Completed Tours
                        </button>
                    </li>
                    </ul>

                </div>

            ) }

            {/* Cards */}
            {filteredTours.map((tour) => (
              <div className="tour_card_v2 mb-4" key={tour.id}>

                <div className="tour_image">
                    <Link to={`/property/${tour.title}`} >
                      <img src={tour.image} alt={tour.title} />
                    </Link>
                  <span className="tour_badge">{tour.tourType}</span>
                </div>

                <div className="tour_content">

                  <div className="tour_header">
                    <div>
                      <h5 className="">{tour.title}</h5>
                      <p className="tour_location m-0">
                        <MapPin size={14} /> {tour.location}
                      </p>
                    </div>

                    <div className="tour_price">{tour.price}</div>
                  </div>

                   <div className="listing-features mt-2">
                    <span><BedDouble size={16} /> {tour.beds} Bed</span>
                    <span><Bath size={16} /> {tour.baths} Bath</span>
                    <span><MapPin size={16} /> {tour.distance} mi</span>
                  </div>

                  <div className="tour_meta ">

                    <div>
                      <User size={15} /> {tour.host}
                    </div>

                    <div>
                      <Calendar size={15} /> {tour.date}
                    </div>

                    <div>
                      <Clock size={15} /> {tour.time}
                    </div>

                  </div>

                  <div className="tour_footer">

                    <span
                      className={`status ${
                        tour.status === "completed"
                          ? "completed"
                          : "confirmed"
                      }`}
                    >
                      {tour.status}
                    </span>

                    <div className="tour_actions">

                      <Link
                        to={`/property/${tour.title}`}
                        className="btn btn-sm btn-primary rounded-2"
                      >
                        View 
                      </Link>

                      {tour.status === "upcoming" && (
                        <>
                          <button className="btn btn-sm btn-warning rounded-2">
                            Reschedule
                          </button>

                          <button className="btn btn-sm btn-danger rounded-2">
                            Cancel
                          </button>
                        </>
                      )}
                    </div>

                  </div>

                </div>
              </div>
            ))}

            {filteredTours.length === 0 && (
               <div className="col-12 text-center bg-white p-5 shadow-sm rounded-3">
                    <Home size={40} className="text_theme" />
                    <h6 className="mt-3">
                        You haven’t booked any tour yet.
                    </h6>
                  </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default BookedTours;