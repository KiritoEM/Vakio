/* eslint-disable @next/next/no-img-element */
"use client"

import { Button } from "@/components/UI/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/UI/navigation-menu";
import { NAV_LIST } from "@/helpers/constant";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { FC, useState } from "react";

const LandingNav: FC = (): JSX.Element => {
  const [activeLink, setActiveLink] = useState<string | null>("Accueil");

  const handleClick = (link: string) => {
    setActiveLink(link);
  };

  return (
    <nav className="w-full h-full">
      <div className="flex items-center justify-between px-20 py-5">
        <div className="navbar-logo">
            <img src="/logo.svg" alt="logo" className="w-[100px]"/>
        </div>
        <div className="navbar-item flex gap-5">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-5">
              {NAV_LIST.map((item, index) => (
                <NavigationMenuItem
                  key={index}
                  onClick={() => handleClick(item.label)}
                >
                  <Link href={item.url as string} passHref legacyBehavior>
                    <NavigationMenuLink
                      className={cn(
                        activeLink === `${item.label}` && "text-primary"
                      )}
                    >
                      {item.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <Button className="rounded-full bg-white text-black">Se connecter</Button>
        </div>
      </div>
    </nav>
  );
};

export default LandingNav;
