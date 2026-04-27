import { Button, Typography } from "@workspace/ui/components";
import { signOut } from "next-auth/react";
import React from "react";

const Logout = () => {
  return (
    <Button
      onClick={() =>
        signOut({
          callbackUrl: "/",
        })
      }
    >
      <Typography as="p" type="body">
        Logout
      </Typography>
    </Button>
  );
};

export default Logout;
