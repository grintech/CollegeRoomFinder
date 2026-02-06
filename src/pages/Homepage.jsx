import React, { useEffect, useState } from 'react'
import Hero from '../components/Hero'
import Steps from '../components/Steps'
import StudentCommunity from '../components/StudentCommunity'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import WaitlistSection from '../components/WaitlistSection'
import PropertyByArea from '../components/PropertyByArea'
import HousingSearchBar from '../components/HousingSearchBAr'
import WhyChooseUs from '../components/WhyChooseUs'
import Pricing from '../components/Pricing'
import CTASection from '../components/CTASection'
import FeaturedListings from '../components/FeaturedListings'
import ListingsGrid from '../components/ListingsGrid'
import { useLocation } from 'react-router-dom'

const Homepage = () => {

  const [filters, setFilters] = useState(null);

   const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const scrollTo = params.get("scroll");

    if (scrollTo) {
      const el = document.getElementById(scrollTo);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  return (
    <>
        <Hero />
        <HousingSearchBar  onSearch={setFilters}  />
        <ListingsGrid filters={filters} />
        <Steps />
        <WhyChooseUs />
        <PropertyByArea />
        {/* <FeaturedListings /> */}
        <StudentCommunity />
        <Pricing />
        <CTASection />
        <Testimonials />
        <FAQ />
        <WaitlistSection />
    </>
  )
}

export default Homepage