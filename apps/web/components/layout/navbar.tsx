"use client";
import { Button, Typography, Tooltip } from "@workspace/ui/components";
import { CloudDownloadIcon, Menu, X, cn } from "@workspace/ui/lib";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ThemeToggle from "../theme-toggle";
import Logout from "../profile/logout";

const Navbar = () => {
  const { status } = useSession();
  const [mounted, setMounted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (process.env.NEXT_PUBLIC_ENV === "development") {
      setShowTooltip(true);
    }
  }, []);

  return (
    <nav className="flex items-center justify-around h-20 bg-elevated dark:bg-secondary">
      <div className="w-full flex items-center justify-between max-w-7xl px-4">
        <Link href={"/"} className="flex items-center space-x-2">
          <div className="bg-primary dark:bg-primary text-white p-2 rounded-2xl">
            <CloudDownloadIcon size={24} className="text-elevated" />
          </div>
          <Typography as="p" type="title">
            Storage
          </Typography>
        </Link>

        <div className="hidden md:flex items-center gap-8">
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

        <div className="hidden md:flex items-center gap-4">
          {mounted && <ThemeToggle />}
          {mounted && (
            <div className="flex items-center gap-3">
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

        <div className="flex md:hidden items-center gap-2">
          {mounted && <ThemeToggle />}
          <Button onClick={() => setMobileOpen(true)} className="m-0 p-2">
            <Menu size={20} />
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-72 bg-elevated dark:bg-secondary shadow-2xl transition-transform duration-300 ease-in-out md:hidden",
          mobileOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex flex-col p-6 h-full">
          <div className="flex justify-end">
            <Button onClick={() => setMobileOpen(false)} className="m-0 p-2">
              <X size={20} />
            </Button>
          </div>

          <div className="flex flex-col gap-6 mt-10">
            <Typography as="p" type="body">
              <Link href={"#home"} onClick={() => setMobileOpen(false)}>
                Home
              </Link>
            </Typography>
            <Typography as="p" type="body">
              <Link href={"#features"} onClick={() => setMobileOpen(false)}>
                Feature
              </Link>
            </Typography>
            <Typography as="p" type="body">
              <Link href={"#pricing"} onClick={() => setMobileOpen(false)}>
                Pricing
              </Link>
            </Typography>
          </div>

          <div className="mt-auto flex flex-col gap-3">
            {mounted && status === "authenticated" ? (
              <>
                <Link
                  href={"/dashboard"}
                  onClick={() => setMobileOpen(false)}
                >
                  <Button className="w-full">
                    <Typography as="p" type="body">
                      Dashboard
                    </Typography>
                  </Button>
                </Link>
                <Logout />
              </>
            ) : (
              <>
                <Link href={"#pricing"} onClick={() => setMobileOpen(false)}>
                  <Button className="w-full">
                    <Typography as="p" type="body">
                      Get Started
                    </Typography>
                  </Button>
                </Link>
                <Link href={"/auth/sign-in"} onClick={() => setMobileOpen(false)}>
                  <Button className="w-full">
                    <Typography as="p" type="body">
                      Login
                    </Typography>
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
