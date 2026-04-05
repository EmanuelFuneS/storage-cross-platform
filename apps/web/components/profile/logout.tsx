import { Button } from "@workspace/ui/components";
import { signOut } from "next-auth/react";
import React from "react";

type Props = {};

const Logout = (props: Props) => {
  return (
    <Button
      onClick={() =>
        signOut({
          callbackUrl: "/",
        })
      }
    >
      Logout
    </Button>
  );
};

export default Logout;
