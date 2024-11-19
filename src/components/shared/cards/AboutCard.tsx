"use client";

import { Card, CardDescription, CardTitle } from "@/components/UI/card";
import { cn } from "@/lib/utils";
import React, { FC } from "react";

interface AboutTypes{
  aboutId: string;
  title: string;
  description: string;
}

const AboutCard: FC<AboutTypes> = ({
  aboutId,
  title,
  description,
 
}): JSX.Element => {
  return (
    <Card
      className={cn("bg-transparent border-none", aboutId === "02" && "ml-5")}
      
    >
      <CardTitle className="text-white text-[28px] font-medium">
        <span className="text-primary">{aboutId}</span>  {title}
      </CardTitle>
      <CardDescription className="text-[#FFFFFFCC]">
        {description}
      </CardDescription>
    </Card>
  );
};

export default AboutCard;
