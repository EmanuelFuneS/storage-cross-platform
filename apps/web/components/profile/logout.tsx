import { Button, Typography } from "@workspace/ui/components";
import { cn } from "@workspace/ui/lib";
import { signOut } from "next-auth/react";
import React from "react";

export interface LogoutProps {
  className?: string;
}

const Logout = ({ className }: LogoutProps) => {
  return (
    <Button
      onClick={() =>
        signOut({
          callbackUrl: "/",
        })
      }
      className={cn(className)}
    >
      <Typography as="p" type="body">
        Logout
      </Typography>
    </Button>
  );
};

export default Logout;
