import { Button } from "@workspace/ui/components/button";
import Typography from "@workspace/ui/components/typography";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-around  h-20">
      <div>
        <Typography as="p" type="title">
          logo
        </Typography>
      </div>
      <div className="flex items-center justify-between w-xs">
        <Typography as="p" type="body">
          <Link href={"#home"}>
          Home
          </Link>
        </Typography>
        <Typography as="p" type="body">
          <Link href={"#features"}>
          Feature
          </Link>
        </Typography>
        <Typography as="p" type="body">
          <Link href={"#pricing"}>
          Pricing
          </Link>
        </Typography>
      </div>
      <div>
        <Button>
          <Typography as="p" type="body">
            Get Started
          </Typography>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
