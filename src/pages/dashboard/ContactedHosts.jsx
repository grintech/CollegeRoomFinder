import { MessageCircle, Calendar, User, Home } from "lucide-react";
import { Link } from "react-router-dom";
import DashSidebar from "./DashSidebar";
import ContactHostModal from "../../components/ContactHostModal";
import { useState } from "react";

const CONTACTED_HOSTS = [
  {
    id: 1,
    title: "Modern Student Apartment Near UCLA",
    hostName: "John Smith",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80",
    message: "Hi, I am interested in this property. Is it still available?",
    date: "12 Feb 2026",
    status: "Pending",
  },
  {
    id: 2,
    title: "Shared Room Close to NYU",
    hostName: "Emily Johnson",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    message: "Can I schedule a tour this weekend?",
    date: "05 Feb 2026",
    status: "Replied",
  },
];

 const slugify = (text) => {
    return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") 
    .replace(/\s+/g, "-");          
    }


const ContactedHosts = () => {

           const [showContact, setShowContact] = useState(false);
           const [activeListing, setActiveListing] = useState(null);

  return (
    <>
        <div className="my_account min_height">
        <div className="container py-4">
            <div className="row">
            <h1 className="mb-3 sec-title text-center">
                Contacted Hosts{" "}
                <span className="text_blue">({CONTACTED_HOSTS.length})</span>
            </h1>

            <div className="col-lg-4 col-xl-3 mb-4 mb-lg-0">
                <DashSidebar />
            </div>

            <div className="col-lg-8 col-xl-9">
                <div className="row g-4">
                {CONTACTED_HOSTS.length ? (
                    CONTACTED_HOSTS.map((item) => (
                    <div className="col-12" key={item.id}>
                        <div className="contact-card p-3 shadow-sm rounded-3 bg-white">
                        <div className="row align-items-center">
                            <div className="col-md-3 mb-3 mb-md-0">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="img-fluid rounded-3"
                            />
                            </div>

                            <div className="col-md-6">
                            <Link className="text_theme" to={`/property/${slugify(item.title)}`} >
                            <h5 className="mb-1 text-truncate">{item.title}</h5>
                            </Link>
                            <p className="mb-1 text-muted">
                                <User size={16} className="me-1" />
                                Host: {item.hostName}
                            </p>
                            <p className="mb-2 small text-muted">
                                <MessageCircle size={16} className="me-1" />
                                {item.message}
                            </p>
                            <p className="mb-0 small text_blue fw-semibold">
                                <Calendar size={14} className="me-1" />
                                Contacted on {item.date}
                            </p>
                            </div>

                            <div className="col-md-3 text-md-end mt-3 mt-md-0">
                            <span
                                className={`badge ${
                                item.status === "Replied"
                                    ? "bg-success"
                                    : "bg-warning text-dark"
                                }`}
                            >
                                {item.status}
                            </span>

                            <div className="mt-3">
                                <Link
                                className="theme_btn_small"
                                onClick={() => { setActiveListing(item); setShowContact(true); }}
                                >
                                Contact Again
                                </Link>
                            </div>

                            
                            </div>
                        </div>
                        </div>
                    </div>
                    ))
                ) : (
                    <div className="col-12 text-center bg-white p-5 shadow-sm rounded-3">
                    <Home size={40} className="text_theme" />
                    <h6 className="mt-3">
                        You haven’t contacted any hosts yet.
                    </h6>
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
    
    </>
  );
};

export default ContactedHosts;