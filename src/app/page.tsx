import About from '@/components/sections/landing/About';
import Assistance from '@/components/sections/landing/Assistance';
import Features from '@/components/sections/landing/Features';
import Footer from '@/components/sections/landing/Footer';
import Hero from '@/components/sections/landing/Hero';
import React from 'react';

const page = () => {
  return (
    <main>
      <Hero/>
      <About/>
      <Features/>
      <Assistance/>
      <Footer/>
    </main>
  );
};

export default page;