import Features from '@/app/(main)/_components/feature'
import Hero from '@/app/(main)/_components/hero'
import Pricing from '@/app/(main)/_components/pricing'
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