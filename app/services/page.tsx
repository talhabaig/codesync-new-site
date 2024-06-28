"use client";
import React, { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Hero from './Hero';
import OurServices from './OurServices';

export default function Services() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ServicesContent />
    </Suspense>
  );
}

function ServicesContent() {
  const searchParams = useSearchParams();
  const selectedTab = searchParams?.get('tab');

  useEffect(() => {
    if (selectedTab) {
      document?.getElementById(selectedTab)?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedTab]);

  return (
    <>
      <Hero />
      <OurServices selectedTab={selectedTab} />
    </>
  );
}