import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

const ScrollTopArrow = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo(0, 0) 
  }

  return (
    visible && (
      <button className="scroll-top-btn" onClick={scrollToTop}>
        <ArrowUp size={20} />
      </button>
    )
  )
}

export default ScrollTopArrow
