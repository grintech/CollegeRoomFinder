import { X } from "lucide-react";
import { useState, useEffect } from "react";
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const ContactHostModal = ({ show, onClose, listing }) => {
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_no: "",
    message: ""
  });

  // Reset form when modal opens with new listing
  useEffect(() => {
    if (show && user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone_no: "",
        message: ""
      });
      setMessage({ text: "", type: "" });
    }
  }, [show, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Special handling for phone field
    if (name === "phone_no") {
      // Allow only numbers and + (only at the beginning)
      const phoneRegex = /^[0-9+]*$/;
      if (value === "" || phoneRegex.test(value)) {
        // Ensure + is only at the beginning
        if (value.includes('+') && value.indexOf('+') !== 0) {
          return; // Don't allow + in the middle
        }
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear message when user starts typing
    setMessage({ text: "", type: "" });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setMessage({ text: "Name is required", type: "error" });
      return false;
    }

    if (!formData.email.trim()) {
      setMessage({ text: "Email is required", type: "error" });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage({ text: "Please enter a valid email address", type: "error" });
      return false;
    }

    if (!formData.message.trim()) {
      setMessage({ text: "Message is required", type: "error" });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if user is logged in
    if (!user) {
      setMessage({ text: "Please log in to contact the host", type: "error" });
      return;
    }

    // Validate form
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const response = await api.post(
        '/inquiries',
        {
          listing_id: listing?.id,
          host_id: listing?.host?.id,
          name: formData.name,
          email: formData.email,
          phone_no: formData.phone_no,
          message: formData.message
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response?.data?.status === true) {
        setMessage({ 
          text: response.data.message || "Inquiry sent successfully!", 
          type: "success" 
        });
        
        // Reset form and close modal after success
        setTimeout(() => {
          setFormData({
            name: user?.name || "",
            email: user?.email || "",
            phone_no: "",
            message: ""
          });
          onClose();
        }, 2000);
      } else {
        setMessage({ 
          text: response?.data?.message || "Failed to send inquiry", 
          type: "error" 
        });
      }

    } catch (error) {
      console.error("Error sending inquiry:", error);
      
      // Handle validation errors
      if (error?.response?.status === 422) {
        const errors = error?.response?.data?.errors;
        if (errors) {
          // Show first validation error
          const firstError = Object.values(errors)[0]?.[0];
          setMessage({ 
            text: firstError || "Validation error", 
            type: "error" 
          });
        } else {
          setMessage({ text: "Please check your input and try again", type: "error" });
        }
      } else {
        setMessage({ 
          text: error?.response?.data?.message || "Failed to send inquiry. Please try again.", 
          type: "error" 
        });
      }

    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div
      className="modal-backdrop-custom"
      onClick={onClose} 
    >
      <div
        className="contact-modal"
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Header */}
        <div className="modal-header">
          <div>
            <h5 className="mb-1">Contact Host</h5>
            <p className="text-muted small mb-0 ">
              <span className="text-capitalize">{listing?.title}</span> • {listing?.price_formatted || `$${listing?.price}`}/mo
            </p>
          </div>

          <button className="close-btn" onClick={onClose} disabled={loading}>
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>
              Name <span className="text-danger">*</span>
            </label>
            <input
              className="form-control"
              placeholder="Your name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="mb-3">
            <label>
              Email <span className="text-danger">*</span>
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="your.email@example.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="mb-3">
            <label>Phone (Optional)</label>
            <input
              className="form-control"
              placeholder="+1234567890"
              name="phone_no"
              value={formData.phone_no}
              onChange={handleChange}
              disabled={loading}
            />
            <small className="text-muted">
              Only numbers and + (at the beginning) allowed
            </small>
          </div>

          <div className="mb-4">
            <label>
              Message <span className="text-danger">*</span>
            </label>
            <textarea
              rows="3"
              className="form-control"
              placeholder="Hi, I'm interested. Is it still available?"
              name="message"
              value={formData.message}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          {/* Message display */}
          {message.text && (
            <div className={`mb-3 text-center fw-semibold ${
              message.type === "success" ? "text-success" : "text-danger"
            }`}>
              {message.text}
            </div>
          )}

          <div className="modal-footer d-flex justify-content-between">
            <button 
              type="submit" 
              className="blue_btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Submitting...
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactHostModal;