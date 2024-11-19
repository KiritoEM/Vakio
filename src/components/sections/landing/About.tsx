"use client";

import AboutCard from "@/components/shared/cards/AboutCard";
import { ABOUT_LIST } from "@/helpers/constant";
import React, { FC } from "react";

const About: FC = (): JSX.Element => {
  return (
    <section className="section-about w-full h-full p-20">
      <div className="landing-about flex gap-20">
        <div className="About-left w-[50%]">
          <h1 className="font-rocknroll text-[35px]">Ce que nous proposons</h1>
          <div className="About-card-list flex flex-col gap-5 pt-6">
            {ABOUT_LIST.map((item, index) => (
              <AboutCard key={index} {...item}/>
            ))}
          </div>
        </div>
        <div className="About-right bg-slate-400 flex-1 rounded-xl"></div>
      </div>
    </section>
  );
};

export default About;
