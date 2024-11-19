"use client"

import React from 'react';

const Assistance = () => {
    return (
      <section className="Assistance-section w-full h-full p-20">
        <div className="Assistance-landing flex">
          <div className="assistance-left w-[60%] flex flex-col justify-center text-start ">
            <h1 className="font-rocknroll text-[35px]">
              Partagez des livres et inspirez la communauté!
            </h1>
            <p className="text-[#FFFFFFCC]">
              Partagez vos coups de cœur, faites découvrir vos livres préférés,
              échangez des avis et inspirez la communauté à travers vos
              recommandations, pour créer un espace de partage et d’inspiration
              littéraire.
            </p>
          </div>
          <div className="assistance-right flex-1">
            {" "}
            <img src="/Unbenanntes.png" alt="" />
          </div>
        </div>
      </section>
    );
};

export default Assistance;