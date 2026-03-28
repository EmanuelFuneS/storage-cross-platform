"use client";
import { Button } from "@workspace/ui/components/button";
import Typography from "@workspace/ui/components/typography";
import Link from "next/link";
import React from "react";
import ThemeToggle from "../theme-toggle";

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
          <Link href={"#home"}>Home</Link>
        </Typography>
        <Typography as="p" type="body">
          <Link href={"#features"}>Feature</Link>
        </Typography>
        <Typography as="p" type="body">
          <Link href={"#pricing"}>Pricing</Link>
        </Typography>
      </div>
      <div>
        <ThemeToggle />
      </div>
      <div className="flex space-x-5">
        <div>
          <Link href={"#pricing"}>
            <Button>
              <Typography as="p" type="body">
                Get Started
              </Typography>
            </Button>
          </Link>
        </div>
        <div>
          <Link href={"/auth/sign-in"}>
            <Button>
              <Typography as="p" type="body">
                Login
              </Typography>
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
