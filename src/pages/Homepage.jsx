import React, { useState } from 'react'
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

const Homepage = () => {

  const [filters, setFilters] = useState(null);

  return (
    <>
        <Hero />
        <HousingSearchBar  onSearch={setFilters}  />
        <ListingsGrid filters={filters} />
        <Steps />
        <WhyChooseUs />
        <FeaturedListings />
        <PropertyByArea />
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