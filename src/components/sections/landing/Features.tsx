"use client";

import BookCard from "@/components/shared/cards/BookCard";
import { Button } from "@/components/UI/button";
import React from "react";

const Features = () => {
  return (
    <section className="features-section w-full h-full px-20">
      <div className="features-landing flex flex-col gap-5">
        <div className="features-title flex justify-between">
          <h1 className="font-rocknroll text-[35px]">Livres populaires</h1>
          <Button className="bg-transparent text-primary hover:text-white">
            Voir plus{" "}
            <img src="/icons/arrowright.svg" alt="right" className="w-[20px]" />
          </Button>
        </div>
        <div className="features-card">
          <BookCard />
        </div>
      </div>
    </section>
  );
};

export default Features;
