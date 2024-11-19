/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client"

import { Card, CardContent,CardFooter, CardTitle } from '@/components/UI/card';
import React from 'react';

const BookCard = () => {
    return (
      <Card className="bg-transparent border-none text-white w-[260px] flex flex-col gap-6">
        <CardTitle>
          <img src="/harryPotter.png" alt="" className="w-[250px] h-[300px] rounded-xl" />
        </CardTitle>
        <CardContent className='flex flex-col gap-3 ml-[-20px]'>
          <h3 className='text-xl'>Harry Potter: The Prequel</h3>
          <h4 className="text-[#FFFFFFCC]">Posté par KiritoEM</h4>
          <div className='flex justify-between'>
            <h4 className="text-[#FFFFFFCC]">J.K. Rowling</h4>
            <p className="flex items-center">
              45
              <img src="/icons/star.svg" className="w-[15px]" />
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    );
};

export default BookCard;