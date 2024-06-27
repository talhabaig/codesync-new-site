"use client"
import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Hero from './Hero';
import OurServices from './OurServices';

export default function Services() {
  const searchParams = useSearchParams();
  const selectedTab: string | null = searchParams.get('tab');

  useEffect(() => {
    if (typeof document !== 'undefined' && selectedTab) {
      const element = document.getElementById(selectedTab);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [selectedTab]);

  return (
    <>
      <Hero />
      <OurServices selectedTab={selectedTab} />
    </>
  );
}