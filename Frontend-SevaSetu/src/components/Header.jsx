import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import logoImage from "../assets/Logo2.png";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useSelector } from "react-redux";

const Header = () => {
  const [foundation, setFoundation] = useState(null);
  const {foundation_} = useSelector((state) => state.foundation);
  useEffect(()=>{
      setFoundation(foundation_)
    },[])
  // console.log(foundation,"from header")

  return (
    <>
    <header className="text-foreground z-90 bg-background fixed font-sans flex px-3 md:px-10 items-center justify-between w-full h-16 backdrop-blur-sm">
       <div className="hidden md:block"> 
        <HoverCard>
          <HoverCardTrigger className="text-2xl font-bold cursor-pointer text-primary">
          {foundation?.name ? foundation.name : "We Care for you"}
          </HoverCardTrigger>
          <HoverCardContent>
            Find an Organization that suits your cause
          </HoverCardContent>
        </HoverCard>
      </div>
      <img className="ml-0 md:ml-20 h-10 md:12" src={logoImage} alt="" />

      <div className="flex gap-2">
        <Button variant="headerButton" size="responsive">Log in</Button>
        <Button variant="headerButton" size="responsive">Get Started</Button>
        <span className="pt-1">
          <ModeToggle />
        </span>
      </div>
    </header>
    <div className=" h-16 px-10 w-full bg-primary-foreground"></div>
    </>
  );
};

export default Header;
