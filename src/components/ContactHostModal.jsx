import { X } from "lucide-react";

const ContactHostModal = ({ show, onClose, listing }) => {
  if (!show) return null;

  return (
    <div
      className="modal-backdrop-custom"
      onClick={onClose} // click outside closes
    >
      <div
        className="contact-modal"
        onClick={(e) => e.stopPropagation()} // prevent inside click
      >
        {/* Header */}
        <div className="modal-header">
          <div>
            <h5 className="mb-1">Contact Host</h5>
            <p className="text-muted small mb-0">
              {listing?.title} • ${listing?.price}/mo
            </p>
          </div>

          <button className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form>
          <div className="mb-3">
            <label>
              Name <span className="text-danger">*</span>
            </label>
            <input
              className="form-control"
              placeholder="Your name"
              required
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
              required
            />
          </div>

          <div className="mb-3">
            <label>Phone (Optional)</label>
            <input
              className="form-control"
              placeholder="(555) 123-4567"
            />
          </div>

          <div className="mb-4">
            <label>
              Message <span className="text-danger">*</span>
            </label>
            <textarea
              rows="3"
              className="form-control"
              placeholder="Hi, I'm interested. Is it still available?"
              required
            />
          </div>

          {/* Footer */}
          <div className="modal-footer d-flex justify-content-between">
            {/* <button
              type="button"
              className="btn btn-light"
              onClick={onClose}
            >
              Cancel
            </button> */}

            <button type="submit" className="blue_btn">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactHostModal;
