import { X, Mail, GraduationCap, MapPin, Globe, Home } from 'lucide-react'
import { useState } from 'react'
import api from '../services/api'
import toast from 'react-hot-toast'

const WaitlistModal = ({ show, onClose }) => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [country, setCountry] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)

  if (!show) return null

  const handleAlphabetOnly = (value, setter) => {
  const regex = /^[A-Za-z\s]*$/  // only letters + space
  if (regex.test(value)) {
    setter(value)
  }
}

   const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name || !email) {
      toast.error("University name and email are required")
      return
    }

    if (!city || !state || !country) {
      toast.error("Please fill all the fields!")
      return
    }

    setLoading(true)

    try {
      const response = await api.post("/campus/request", {
        name,
        email,
        city,
        state,
        country,
        description
      })

      if (response?.data?.status === true) {
        toast.success(response?.data?.message || "Request submitted successfully")

        // Reset form
        setName("")
        setEmail("")
        setCity("")
        setState("")
        setCountry("")
        setDescription("")

        onClose()
      } else {
        toast.error(response?.data?.message || "Something went wrong")
      }

    } catch (error) {

      // Handle validation errors (422)
      if (error?.response?.status === 422) {
        const errors = error?.response?.data?.errors

        // If name OR email validation error exists
        if (errors?.name || errors?.email) {
          toast.error("Request already submitted for this university.")
        } else {
          toast.error("Validation error")
        }
      } else {
        toast.error(
          error?.response?.data?.message || "Server error. Please try again."
        )
      }

    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="modal-backdrop-custom" 
      onClick={onClose} // click outside closes
     >
      <div className="waitlist-modal" 
       onClick={(e) => e.stopPropagation()} 
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
        <form onSubmit={handleSubmit} >
          <div className="row">
            <div className="col-12 mb-3">
              <label>University Name <span className="text-danger">*</span></label>
              <div className="input-icon">
                <GraduationCap size={18} />
                <input
                  className="form-control"
                  placeholder="e.g. Stanford University"
                   value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="col-12 mb-3">
              <label>Email Address <span className="text-danger">*</span></label>
              <div className="input-icon">
                <Mail size={18} />
                <input
                  type="email"
                  className="form-control"
                  placeholder="you@email.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>


            <div className="col-md-6 mb-3">
              <label>City</label>
              <div className="input-icon">
                <MapPin size={18} />
                <input className="form-control" placeholder="e.g. Palo Alto" 
                  value={city}
                  onChange={(e) => handleAlphabetOnly(e.target.value, setCity)}
                />
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <label>State</label>
               <div className="input-icon">
                <Home size={18} />
                <input className="form-control" placeholder="e.g. Palo Alto" 
                  value={state}
                   onChange={(e) => handleAlphabetOnly(e.target.value, setState)}
                />
              </div>
            </div>

            <div className="col-12 mb-3">
              <label>Country</label>
              <div className="input-icon">
                <Globe size={18} />
                <input className="form-control" placeholder="e.g. USA" 
                   value={country}
                  onChange={(e) => handleAlphabetOnly(e.target.value, setCountry)}
                />
              </div>
            </div>

            <div className="col-12 mb-3">
              <label>Additional Information (Optional)</label>
              <textarea
                rows="3"
                className="form-control"
                placeholder="Any specific requirements or preferences..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Footer */}
            <div className="modal-footer">
              
              <button type="submit" 
               className="blue_btn"
               disabled={loading}
               >
                {loading ? "Submitting..." : "Join Waitlist"}
              </button>
            </div>

          </div>

        </form>
      </div>
    </div>
  )
}

export default WaitlistModal
