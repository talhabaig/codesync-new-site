"use client"
import React, { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Hero from './Hero'
import OurServices from './OurServices'

export default function Services() {
  const searchParams = useSearchParams();
  const selectedTab: string | null = searchParams.get('tab');

  useEffect(() => {
    if (selectedTab) {
      document.getElementById(selectedTab)?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedTab]);

  return (
    <>
      <Hero />
      <OurServices selectedTab={selectedTab} />
    </>
  )
}
