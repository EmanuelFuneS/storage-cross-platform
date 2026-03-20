import { Button } from "@workspace/ui/components/button";
import Typography from "@workspace/ui/components/typography";
import React from "react";

const Hero = () => {
  return (
    <section id="home" className="flex-1 flex min-h-screen py-15">
      <div className="w-1/2 min-h-full flex flex-col items-start justify-center space-y-4">
        <Typography as="h1" type="display">
          Your files, everywhere
        </Typography>
        <Typography as="p" type="body">
          Secure cloud storage for your photos, documents, and everythings else
          that matters. Access them from any device, anywhere in the world with
          best encryption.
        </Typography>
        <div className="w-full felx items-center justify-start gap-4 py-4">
          <Button>Start Free trial</Button>

          <Button>View Demo</Button>
        </div>
      </div>
      <div className="w-1/2 min-h-full bg-orange-700"></div>
    </section>
  );
};

export default Hero;
