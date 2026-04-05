import Link from "next/link";
import React, { JSX } from "react";
import {
  Trash,
  Star,
  Clock,
  FileExclamationPoint,
  DatabaseBackup,
} from "@workspace/ui/lib";
import ThemeToggle from "@/components/theme-toggle";
import Card from "@workspace/ui/components/card";
import { Separator } from "@workspace/ui/components";

interface LayoutAdminProps {
  children: React.ReactNode;
}

interface Route {
  path: string;
  name: string;
  icon: React.ElementType;
}

const asideRoutes: Route[] = [
  {
    path: "/recent",
    name: "Recent",
    icon: Clock,
  },
  {
    path: "/shared",
    name: "Shared",
    icon: FileExclamationPoint,
  },
  {
    path: "/starred",
    name: "Starred",
    icon: Star,
  },
  {
    path: "/storage",
    name: "Storage",
    icon: DatabaseBackup,
  },
  {
    path: "/trash",
    name: "Trash",
    icon: Trash,
  },
];

const LayoutAdmin = ({ children }: LayoutAdminProps) => {
  return (
    <div className="w-full h-screen flex">
      <aside className="bg-blue-600 ">
        <Card
          border={false}
          scale={false}
          className="flex flex-col p-10 w-100 h-full"
        >
          <div className="h-30">
            auth information
            <ThemeToggle />
          </div>
          <Separator />
          <div className="flex flex-col space-y-10">
            {asideRoutes.map((el: Route, idx: number) => (
              <div key={idx} className="flex space-x-2">
                <el.icon />
                <Link href={el.path}>{el.name}</Link>
              </div>
            ))}
          </div>
          <div className="my-auto">settings route</div>
        </Card>
      </aside>
      <main className="bg-orange-700 p-10 w-full ">{children}</main>
    </div>
  );
};

export default LayoutAdmin;
