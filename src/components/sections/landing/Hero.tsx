/* eslint-disable react/no-unescaped-entities */
"use client";

import { Button } from "@/components/UI/button";
import React from "react";

const Hero = () => {
  return (
    <section className="section-hero w-full h-full py-20 overflow-hidden">
      <div className="flex flex-col items-center justify-center text-center gap-10">
        <div className="flex flex-col w-[60%] font-rocknroll">
          <h2 className="text-[35px] text-primary">Bienvenue sur Vakio</h2>
          <h1 className=" text-[10vh] text-primary-foreground leading-tight">
            Plongez dans l'univers captivant des Livres
          </h1>
        </div>
        <h6 className="text-[#FFFFFFCC] w-[40%]">
          Vakio est une application qui vous propose une sélection de livres
          variés, des recommandations personnalisées et une IA pour simplifier
          vos recherches.
        </h6>
        <Button className="bg-white text-black rounded-full">
          Découvrir nos livres
        </Button>
        <div className="absolute bottom-20 right-0 w-[300px] flex flex-col items-start text-start">
          <p>“La lecture, une porte ouverte sur un monde enchanté.”</p>
          <h3>François Mauriac</h3>
        </div>
      </div>
    </section>
  );
};

export default Hero;
