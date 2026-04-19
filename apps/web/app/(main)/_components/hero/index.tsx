"use client";
import { Button, Typography } from "@workspace/ui/components";
import React, { useEffect } from "react";
import heroImg from "@/public/hero_app.png";
import Image from "next/image";

const Hero = () => {
  /*  useEffect(() => {
    const testFetch = async () => {
      const result = await fetch(
        "https://s03-26-equipo-14-web-app-development.onrender.com/embed",
        {
          method: "Get",
          headers: {
            'x-embed-key': 'cms-api-key:DRAG954HBGPTuML0KvR0_g:Wt1_pWvPMg22Y0x6r6poJcNygqyVUU9FDTVJ-F60XeqW2o9Nkuux4ND_1XvHah3m8OL93JRPyv1cHO0dreVWYFLPk-QhGQlTlIEQ1PAF8WgwdZnf6Km4vKQu_rcx_CpWqQ2vx4RJT9Rx-VqjNjunIQ'
          }
        },
      );

      console.log(result);
    };
    //testear con apikey
    //testear sin apikey
    //testear con un string random

    testFetch();
  }, []); */

  return (
    <section
      id="home"
      className="flex-1 flex flex-col lg:flex-row min-h-screen m-10 lg:m-5 py-15"
    >
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
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center min-h-full">
        <Image src={heroImg} alt="Hero app" priority />
      </div>
    </section>
  );
};

export default Hero;
