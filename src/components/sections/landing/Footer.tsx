"use client"

import React from 'react';

const Footer = () => {
    return (
      <section className="footer-section w-full h-full px-20">
        <div className="footer-landing flex flex-col">
          <div className="footer-top flex justify-center items-center py-20">
            <div className="bg-gray-500 w-[400px] h-[400px] rounded-xl"></div>
          </div>
          <div className="footer-bottom text-sm flex justify-center items-center py-5">Vakio 2024 by IT-WARRIOR</div>
        </div>
      </section>
    );
};

export default Footer;