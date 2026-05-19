import { Button, Typography } from "@workspace/ui/components";
import { cn, LogOut } from "@workspace/ui/lib";
import { signOut } from "next-auth/react";
import React from "react";

export interface LogoutProps {
  className?: string;
  iconOnly?: boolean;
}

const Logout = ({ className, iconOnly }: LogoutProps) => {
  const handleLogout = () =>
    signOut({
      callbackUrl: "/",
    });

  if (iconOnly) {
    return (
      <button
        onClick={handleLogout}
        className={cn(
          "rounded-xl p-2 hover:bg-accent transition-colors text-foreground hover:text-foreground",
          className,
        )}
        aria-label="Logout"
      >
        <LogOut size={25} />
      </button>
    );
  }

  return (
    <Button onClick={handleLogout} className={cn(className)}>
      <Typography as="p" type="body">
        Logout
      </Typography>
    </Button>
  );
};

export default Logout;
