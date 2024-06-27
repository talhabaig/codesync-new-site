"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import Hero from './Hero'
import OurServices from './OurServices'
export default function Services() {
  const router = useRouter();
  const { tab } = router.query;
  const selectedTab = typeof tab === 'string' ? tab : null;

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
  );
}