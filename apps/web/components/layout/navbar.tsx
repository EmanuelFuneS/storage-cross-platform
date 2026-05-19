"use client";
import { Button, Card, Typography, Tooltip } from "@workspace/ui/components";
import { CloudDownloadIcon } from "@workspace/ui/lib";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ThemeToggle from "../theme-toggle";
import Logout from "../profile/logout";

const Navbar = () => {
  const { status } = useSession();
  const [mounted, setMounted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (process.env.NODE_ENV === "development") {
      setShowTooltip(true);
    }
  }, []);

  return (
    <nav className="flex items-center justify-around h-20 bg-elevated dark:bg-secondary">
      <div className="w-full flex items-center justify-between max-w-7xl">
        <Link href={"/"} className="flex items-center space-x-2">
          <div className="bg-primary dark:bg-primary text-white p-2 rounded-2xl">
            <CloudDownloadIcon size={24} className="text-elevated" />
          </div>
          <Typography as="p" type="title">
            Storage
          </Typography>
        </Link>
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
        <div>{mounted && <ThemeToggle />}</div>
        {mounted && (
          <div className="flex space-x-5">
            <div>
              {status === "authenticated" ? (
                <Logout />
              ) : (
                <Link href={"#pricing"}>
                  <Button>
                    <Typography as="p" type="body">
                      Get Started
                    </Typography>
                  </Button>
                </Link>
              )}
            </div>
            <div className="relative">
              {status === "authenticated" ? (
                <Link href={"/dashboard"}>
                  <Button>
                    <Typography as="p" type="body">
                      Dashboard
                    </Typography>
                  </Button>
                </Link>
              ) : (
                <Link href={"/auth/sign-in"}>
                  <Button>
                    <Typography as="p" type="body">
                      Login
                    </Typography>
                  </Button>
                </Link>
              )}
              <Tooltip
                show={showTooltip && status !== "authenticated"}
                onClose={() => setShowTooltip(false)}
              >
                You can login with test user
              </Tooltip>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
