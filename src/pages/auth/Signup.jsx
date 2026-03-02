import { useState } from "react"
import {
  User,
  Mail,
  Lock,
  GraduationCap,
  Building2,
  Phone,
  Calendar,
  Eye,
  EyeOff
} from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import UniversitySelect from "./components/UniversitySelect"
import toast from "react-hot-toast"
import api from "../../services/api"

const Signup = () => {
  const navigate = useNavigate()

  const [role, setRole] = useState("student")
  const [showPassword, setShowPassword] = useState(false)
  const [showPassword1, setShowPassword1] = useState(false)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
    university: "",
    graduation_year: "",
    business_name: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (role === "student" && !formData.university) {
      toast.error("Please select your university")
      setLoading(false)
      return
    }

    if (formData.password !== formData.password_confirmation) {
      toast.error("Passwords do not match")
      setLoading(false)
      return
    }

    try {
      const data = new FormData()

      data.append("full_name", formData.full_name)
      data.append("email", formData.email)
      data.append("phone", formData.phone)
      data.append("password", formData.password)
      data.append("password_confirmation", formData.password_confirmation)
      data.append("role", role)

      if (role === "student") {
        data.append("university", formData.university)
        data.append("graduation_year", formData.graduation_year)
      }

      if (role === "host") {
        data.append("business_name", formData.business_name)
      }

      const response = await api.post("/register", data)

      if (response?.data?.status === true) {
        toast.success(response.data.message || "Registration successful!")

        // Save token
        localStorage.setItem("registerToken", response.data.token)

         setTimeout(() => {
          navigate("/login")
        }, 3000)

      } else {
        toast.error(response?.data?.message || "Something went wrong")
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Registration failed"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="signup_page">
      <div className="auth-page d-flex align-items-center justify-content-center">
        <div className="auth-card">
          <div className="text-center mb-4">
            <Link to="/">
              <img src="/images/logo_new.png" className="logo mb-4" />
            </Link>
            <h1 className="mb-1">Create Account</h1>
            <p className="text-muted">
              Sign up to find or list student housing
            </p>
          </div>

          {/* Role Switch */}
          <div className="role-switch mb-4">
            <button
              type="button"
              className={role === "student" ? "active" : ""}
              onClick={() => setRole("student")}
            >
              <GraduationCap size={18} className="me-2" />
              Student
            </button>

            <button
              type="button"
              className={role === "host" ? "active" : ""}
              onClick={() => setRole("host")}
            >
              <Building2 size={16} className="me-2" />
              Host / Landlord
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="mb-3">
              <label>Full Name *</label>
              <div className="input-icon">
                <User size={18} />
                <input
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            {/* Student Fields */}
            {role === "student" && (
              <>
                <div className="mb-3">
                  <UniversitySelect
                    value={formData.university}
                    onChange={(value) =>
                      setFormData({ ...formData, university: value })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label>Graduation Year *</label>
                  <div className="input-icon">
                    <Calendar size={18} />
                    <input
                      name="graduation_year"
                      value={formData.graduation_year}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "") // numbers only
                        if (value.length <= 4) {
                          setFormData({ ...formData, graduation_year: value })
                        }
                      }}
                      className="form-control"
                      placeholder="2028"
                      required
                    />
                  </div>
                </div>
              </>
            )}

            {/* Host Fields */}
            {role === "host" && (
              <div className="mb-3">
                <label>Company / Business Name *</label>
                <div className="input-icon">
                  <Building2 size={18} />
                  <input
                    name="business_name"
                    value={formData.business_name}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Property Management LLC"
                    required
                  />
                </div>
              </div>
            )}

            {/* Phone */}
            <div className="mb-3">
              <label>Phone</label>
              <div className="input-icon">
                <Phone size={18} />
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9+]/g, "") // allow only numbers + 
                    if (value.length <= 15) {
                      setFormData({ ...formData, phone: value })
                    }
                  }}
                  className="form-control"
                  placeholder="9876543210"
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-3">
              <label>Email *</label>
              <div className="input-icon">
                <Mail size={18} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-3">
              <label>Password *</label>
              <div className="input-icon password-field">
                <Lock size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-control"
                   minLength={6}
                  required
                />
                <span className="eye" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </span>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="mb-3">
              <label>Confirm Password *</label>
              <div className="input-icon password-field">
                <Lock size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password_confirmation"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  className="form-control"
                   minLength={6}
                  required
                />
                <span className="eye" onClick={() => setShowPassword1(!showPassword1)}>
                  {showPassword1 ? <Eye size={18} /> : <EyeOff size={18} />}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="blue_btn w-100"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <div className="text-center mt-3">
            Already have an account?{" "}
            <Link to="/login" className="text_blue">
              Login
            </Link>
          </div>
          <p className="terms text-center mt-4 small mb-0">By continuing, you agree to our <Link to="#" data-discover="true">Terms of Service</Link> and <Link to="#" data-discover="true">Privacy Policy</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Signup