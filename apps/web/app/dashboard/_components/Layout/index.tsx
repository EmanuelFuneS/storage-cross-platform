"use client";
import Link from "next/link";
import React, { JSX } from "react";
import {
  CloudDownloadIcon,
  Trash,
  Star,
  ClockFading,
  Folder,
  HardDrive,
  UsersRound,
  cn,
} from "@workspace/ui/lib";
import ThemeToggle from "@/components/theme-toggle";
import Card from "@workspace/ui/components/card";
import { Button, Separator, Typography } from "@workspace/ui/components";
import Image from "next/image";
import AppIcon from "@/public/box.png";
import { usePathname } from "next/navigation";

interface LayoutDashboardProps {
  children: React.ReactNode;
}

interface Route {
  path: string;
  name: string;
  icon: React.ElementType;
}

const asideRoutes: Route[] = [
  {
    path: "/dashboard",
    name: "My Files",
    icon: Folder,
  },
  {
    path: "/dashboard/recent",
    name: "Recent",
    icon: ClockFading,
  },
  {
    path: "/dashboard/shared",
    name: "Shared",
    icon: UsersRound,
  },
  {
    path: "/dashboard/starred",
    name: "Starred",
    icon: Star,
  },
  {
    path: "/dashboard/storage",
    name: "Storage",
    icon: HardDrive,
  },
  {
    path: "/dashboard/trash",
    name: "Trash",
    icon: Trash,
  },
];

const LayoutDashboard = ({ children }: LayoutDashboardProps) => {
  const pathname = usePathname();

  /* const segments = pathname?.split("/").filter(Boolean) || [];
  const [basePath, ...slug] = segments; */

  return (
    <div className="w-full h-screen flex">
      <aside className="hidden lg:block">
        <Card
          border={false}
          scale={false}
          className="flex flex-col p-10 w-100 h-full"
        >
          <div className="h-30 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {/* <Image src={AppIcon} alt="Logo app" className="w-15 h-15" /> */}
              <div className="bg-primary dark:bg-primary text-white py-4 px-3 rounded-2xl">
                <CloudDownloadIcon size={40} className="text-elevated" />
              </div>
              <div>
                <Typography as="h1" type="title">
                  Storage Dashboard
                </Typography>
                <Typography as="p" type="body">
                  Plan Selected
                </Typography>
              </div>
            </div>
            <ThemeToggle />
          </div>

          <div className="flex flex-col space-y-10">
            {asideRoutes.map((el: Route, idx: number) => {
              const isSelected = pathname === asideRoutes[idx]?.path!;

              return (
                <Link
                  key={idx}
                  href={`${el.path}`}
                  className={cn(
                    "rounded-xl hover:text-white hover:bg-primary hover:dark:bg-primary",
                    isSelected
                      ? "bg-primary dark:bg-primary text-white"
                      : "hover:bg-primary",
                  )}
                >
                  <div className="flex items-center space-x-2 h-12 p-6 ">
                    <el.icon />
                    <Typography as="p" type="body">
                      {el.name}
                    </Typography>
                  </div>
                </Link>
              );
            })}
          </div>

          <Card
            scale={false}
            border={true}
            className="bg-card-nested dark:bg-card-nested my-auto p-5"
          >
            storage bar porcentage storage space
            <Button className="w-full my-5">
              Upgrade Plan
            </Button>
          </Card>
        </Card>
      </aside>
      <main className="p-2 lg:p-10 w-full ">{children}</main>
    </div>
  );
};

export default LayoutDashboard;
