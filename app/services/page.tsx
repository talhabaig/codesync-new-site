"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Hero from './Hero';
import OurServices from './OurServices';

export default function Services() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<string | null>(null);

  useEffect(() => {
    const { tab } = router.query;
    setSelectedTab(tab as string);
  }, [router.query]);

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