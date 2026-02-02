import { useState } from 'react'
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
} from 'lucide-react'
import { Link } from 'react-router-dom'
import UniversitySelect from './components/UniversitySelect'

const Signup = () => {
  const [role, setRole] = useState('student')
  const [showPassword, setShowPassword] = useState(false)
  const [university, setUniversity] = useState('')


  return (
    <div className='signup_page'>
      <div className="auth-page d-flex align-items-center justify-content-center">
        <div className="auth-card">
          <div className="text-center mb-4">
            <Link to="/">
              <img src="/images/logo_new.png" className="logo mb-4" />
            </Link>
            <h1 className="mb-1">Create Account</h1>
            <p className="text-muted ">
              Sign up to find or list student housing
            </p>
          </div>

          {/* Student / Host Tabs */}
          <div className="role-switch mb-4">
            <button
              type="button"
              className={role === 'student' ? 'active' : ''}
              onClick={() => setRole('student')}
            >
              <GraduationCap size={18} className="me-2" />
              Student
            </button>
            <button
              type="button"
              className={role === 'host' ? 'active' : ''}
              onClick={() => setRole('host')}
            >
              <Building2 size={16} className="me-2" />
              Host / Landlord
            </button>
          </div>

          <form>
            {/* ================= STUDENT ================= */}
            {role === 'student' && (
              <>
                <div className="mb-3">
                  <label>Full Name <span className="text-danger">*</span></label>
                  <div className="input-icon">
                    <User size={18} />
                    <input className="form-control" placeholder="John Doe" />
                  </div>
                </div>

                <div className="mb-3">
                  <UniversitySelect
                    value={university}
                    onChange={setUniversity}
                  />
                </div>

                <div className="mb-3">
                  <label>Graduation Year <span className="text-danger">*</span></label>
                  <div className="input-icon">
                    <Calendar size={18} />
                    <input className="form-control" placeholder="2028" />
                  </div>
                </div>
              </>
            )}

            {/* ================= HOST ================= */}
            {role === 'host' && (
              <>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label>First Name <span className="text-danger">*</span></label>
                    <div className="input-icon">
                      <User size={18} />
                      <input className="form-control" placeholder="John" />
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Last Name <span className="text-danger">*</span></label>
                    <div className="input-icon">
                      <User size={18} />
                      <input className="form-control" placeholder="Smith" />
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label>Company / Business Name <span className="text-danger">*</span></label>
                  <div className="input-icon">
                    <Building2 size={18} />
                    <input
                      className="form-control"
                      placeholder="Property Management LLC"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Common fields */}
            <div className="mb-3">
              <label>Phone Number</label>
              <div className="input-icon">
                <Phone size={18} />
                <input className="form-control" placeholder="(555) 123-4567" />
              </div>
            </div>

            <div className="mb-3">
              <label>Email <span className="text-danger">*</span></label>
              <div className="input-icon">
                <Mail size={18} />
                <input
                  type="email"
                  className="form-control"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-3">
              <label>Password <span className="text-danger">*</span></label>
              <div className="input-icon password-field">
                <span
                  className="lock"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <Lock size={18} />
                </span>

                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  placeholder="••••••••"
                />

                <span
                  className="eye"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </span>
              </div>
            </div>

            <button className="blue_btn w-100">Create Account</button>
          </form>

          <div className="text-center mt-3">
            Already have an account? <Link to="/login" className='text_blue'>Login</Link>
          </div>

          <p className="terms text-center mt-4 small mb-0">
            By continuing, you agree to our <Link to="#">Terms of Service</Link> and{' '}
            <Link to="#">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup
