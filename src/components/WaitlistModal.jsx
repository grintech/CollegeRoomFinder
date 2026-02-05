import { X, Mail, GraduationCap, MapPin } from 'lucide-react'

const WaitlistModal = ({ show, onClose }) => {
  if (!show) return null

  return (
    <div className="modal-backdrop-custom" 
      onClick={onClose} // click outside closes
     >
      <div className="waitlist-modal" 
       onClick={(e) => e.stopPropagation()} //  prevent inside click
      >
        {/* Header */}
        <div className="modal-header">
          <h5>Join the Waitlist</h5>
          <button className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <p className="text-muted small mb-4">
          Can't find your university? Let us know and we'll notify you when
          rooms become available near your campus.
        </p>

        {/* Form */}
        <form>
          <div className="mb-3">
            <label>Email Address <span className="text-danger">*</span></label>
            <div className="input-icon">
              <Mail size={18} />
              <input
                type="email"
                className="form-control"
                placeholder="you@email.edu"
              />
            </div>
          </div>

          <div className="mb-3">
            <label>University Name <span className="text-danger">*</span></label>
            <div className="input-icon">
              <GraduationCap size={18} />
              <input
                className="form-control"
                placeholder="e.g. Stanford University"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label>City</label>
              <div className="input-icon">
                <MapPin size={18} />
                <input className="form-control" placeholder="e.g. Palo Alto" />
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <label>State</label>
              <input className="form-control" placeholder="e.g. CA" />
            </div>
          </div>

          <div className="mb-3">
            <label>Additional Information (Optional)</label>
            <textarea
              rows="3"
              className="form-control"
              placeholder="Any specific requirements or preferences..."
            />
          </div>

          {/* Footer */}
          <div className="modal-footer">
            
            <button type="submit" className="blue_btn">
              Join Waitlist
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default WaitlistModal
