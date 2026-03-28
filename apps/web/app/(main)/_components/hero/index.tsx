"use client";
import { Button } from "@workspace/ui/components/button";
import Typography from "@workspace/ui/components/typography";
import React from "react";
import heroImg from "@/public/hero_app.png";
import Image from "next/image";

const Hero = () => {
  return (
    <section id="home" className="flex-1 flex flex-col lg:flex-row min-h-screen m-10 lg:m-5 py-15">
      <div className="w-full lg:w-1/2 min-h-full flex flex-col items-start text-center lg:text-start justify-center space-y-4">
        <Typography as="h1" type="display">
          Your files, everywhere
        </Typography>
        <Typography as="p" type="body">
          Secure cloud storage for your photos, documents, and everythings else
          that matters. Access them from any device, anywhere in the world with
          best encryption.
        </Typography>
        <div className="w-full felx items-center justify-around">
          <Button className="mr-5">Start Free trial</Button>

          <Button>View Demo</Button>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center min-h-full bg-orange-700">
        <Image src={heroImg} alt="Hero app" priority />
      </div>
    </section>
  );
};

export default Hero;
