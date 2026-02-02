import { useState, useRef, useEffect } from 'react'
import { ChevronDown, GraduationCap } from 'lucide-react'

const universities = [
  'University of Alabama',
  'Texas A&M University',
  'Harvard University',
  'University of Notre Dame',
  'University of Michigan',
  'University of Southern California (USC)',
  'Penn State University',
  'University of Florida',
  'Florida State University',
  'University of Miami',
  'University of Maryland, College Park',
  'University of Maryland, Baltimore County (UMBC)',
  'Towson University',
  'Bowie State University',
  'Morgan State University'
]

const UniversitySelect = ({ value, onChange }) => {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  // Close on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className="custom-select" ref={ref}>
      <label>University <span className="text-danger">*</span></label>

      <div
        className={`select-input ${open ? 'open' : ''}`}
        onClick={() => setOpen(!open)}
      >
        <GraduationCap size={18} />
        <span className={!value ? 'placeholder' : ''}>
          {value || 'Select your university'}
        </span>
        <ChevronDown size={18} className="arrow" />
      </div>

      {open && (
        <div className="select-dropdown">
          {universities.map((uni) => (
            <div
              key={uni}
              className="select-option"
              onClick={() => {
                onChange(uni)
                setOpen(false)
              }}
            >
              {uni}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default UniversitySelect
