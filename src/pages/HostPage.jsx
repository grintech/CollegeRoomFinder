import { Link } from 'react-router-dom'
import React from 'react'
import { Home, Mail } from 'lucide-react'
import StepHosts from '../components/StepHosts'
import Pricing from '../components/Pricing'
import HostFaq from '../components/HostFaq'
import HostContact from '../components/HostContact'

const HostPage = () => {
  return (
    <>
        <div className="host_page">
            <div className="host-section">
                <div className="container ">
                    <div className="row align-items-center">

                    {/* LEFT CONTENT */}
                    <div className="col-lg-6 col-xxl-6">
                        <h1 className='text_blue'>
                            Fill Your Rooms Faster <br />
                            <span className='text_theme fw-bold'>With Verified Students</span>
                            </h1>

                            <p className="hero-subtitle">
                            Turn your student accommodation into a high-performing asset.  
                            Our platform connects your property with genuine, verified students
                            from nearby universities who are actively searching for safe, affordable,
                            and well-located housing.  
                            <br /><br />
                            No brokers. No time-wasting inquiries. Just quality leads, smarter visibility,
                            and faster bookings — all managed through one simple dashboard designed
                            specifically for student housing hosts.
                            </p>

                        <div className="d-flex flex-wrap gap-3 mt-4">
                        <Link to="#" className="d-flex align-items-center blue_btn">
                           <Home className='me-1' size={20} /> <span>Start Listing</span>
                        </Link>

                        <a href='#portfolio_demo' className="d-flex align-items-center theme_outline_btn">
                          <Mail className='me-1' size={20}  /> Book a Demo
                        </a>
                        </div>
                    </div>

                    {/* RIGHT IMAGE */}
                    <div className="col-lg-6 col-xxl-5 offset-xxl-1 text-center position-relative mt-5 mt-lg-0">
                        <div className="hero-image-wrapper">
                        <img
                            src="/images/host.avif" 
                            alt="Student moving in"
                            className="hero-image w-100  "
                        />
                        </div>
                    </div>

                    </div>
                </div>
            </div>
            <StepHosts />

            <section className="cta-section host-cta">
                <div className="cta-overlay">
                    <div className="container">
                    <div className="row justify-content-center text-center">
                        <div className="col-lg-9">
                        
                        <h2 className="cta-heading">
                            Turn Empty Rooms Into
                            <br />
                            <span>Reliable Student Income</span>
                        </h2>

                        <p className="cta-text">
                            Join hundreds of property owners listing student-friendly homes
                            near top universities. Get verified inquiries, faster bookings,
                            and complete control — without brokers or hidden fees.
                        </p>

                        <div className="cta-buttons d-flex justify-content-center gap-3">
                            <Link to="/list-property">
                            <button className="light_btn">
                                Start Listing Today
                            </button>
                            </Link>

                            {/* <Link to="/contact">
                            <button className="theme_outline_btn">
                                Book a Free Demo
                            </button>
                            </Link> */}
                        </div>

                        </div>
                    </div>
                    </div>
                </div>
            </section>

            <Pricing />
            <HostContact/>
            <HostFaq/>


        </div>
    </>
  )
}

export default HostPage