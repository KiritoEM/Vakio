"use client";

import AboutCard from "@/components/shared/cards/AboutCard";
import React from "react";

const About = () => {
  return (
    <section className="section-about w-full h-full">
      <div className="container">
        <div className="About-left">
          <h1>Ce que nous proposons</h1>
          <AboutCard/>
        </div>
        <div className="About-right bg-slate-400">
            
        </div>
      </div>
    </section>
  );
};

export default About;
