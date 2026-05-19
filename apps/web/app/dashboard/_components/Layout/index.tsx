"use client";
import Link from "next/link";
import React, { JSX, useState } from "react";
import {
  CloudDownloadIcon,
  Trash,
  Star,
  ClockFading,
  Folder,
  HardDrive,
  UsersRound,
  Menu,
  X,
  cn,
} from "@workspace/ui/lib";
import ThemeToggle from "@/components/theme-toggle";
import Card from "@workspace/ui/components/card";
import { Button, Separator, Typography } from "@workspace/ui/components";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import useStorageStatus from "@/lib/hooks/useStorageStatus";
import FileHelper from "@/lib/utils/FileHelper";
import Logout from "@/components/profile/logout";

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
  /*   {
    path: "/dashboard/shared",
    name: "Shared",
    icon: UsersRound,
  }, */
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

const sidebarContent = (
  pathname: string | null,
  data: any,
  setMobileOpen: any,
  planName?: string,
) => (
  <Card
    border={false}
    scale={false}
    className="flex flex-col p-10 w-100 h-full"
  >
    <div className="w-full flex items-center justify-end lg:hidden">
      <Button onClick={() => setMobileOpen(false)} className="m-0">
        <X size={20} />
      </Button>
    </div>
    <div className="h-30 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <div className="bg-primary dark:bg-primary text-white py-4 px-3 rounded-2xl">
          <CloudDownloadIcon size={40} className="text-elevated" />
        </div>
        <div>
          <Typography as="h1" type="title">
            Storage Dashboard
          </Typography>
          <Typography as="p" type="body" className="capitalize">
            Plan {planName || "Plan Selected"} selected
          </Typography>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Logout iconOnly />
        <ThemeToggle />
      </div>
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
            //onClick={setMobileOpen(false)}
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
      <Typography as="p" type="body">
        Capacity: {FileHelper.formatSize(data?.capacity!)}
      </Typography>
      <Typography as="p" type="body">
        Used: {FileHelper.formatSize(data?.used!)}
      </Typography>

      <Button scale={true} className="w-full my-5">
        Upgrade Plan
      </Button>
    </Card>
  </Card>
);

const LayoutDashboard = ({ children }: LayoutDashboardProps) => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session } = useSession();

  const { data } = useStorageStatus();

  return (
    <div className="w-full h-screen flex relative">
      <Button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-primary text-white p-2 rounded-lg"
      >
        <Menu size={20} />
      </Button>

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full transition-transform duration-300 ease-in-out lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="relative h-full">
          {sidebarContent(pathname, data, setMobileOpen, session?.user?.planName)}
        </div>
      </aside>

      <aside className="hidden lg:block">
        {sidebarContent(pathname, data, setMobileOpen, session?.user?.planName)}
      </aside>

      <main className="p-2 pt-5 lg:p-10 w-full">{children}</main>
    </div>
  );
};

export default LayoutDashboard;
