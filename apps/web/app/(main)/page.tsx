import Features from '@/components/feature'
import Hero from '@/components/hero'
import Pricing from '@/components/pricing'
import React from 'react'

const Page = () => {
  return (
    <div className="flex-1 flex flex-col min-h-0">
        <Hero/>
        <Features/>
        <Pricing/>
    </div>
  )
}

export default Page