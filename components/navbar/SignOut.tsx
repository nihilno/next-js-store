"use client";

import { SignOutButton } from "@clerk/nextjs";
import { toast } from "sonner";

function SignOut() {
  function handleLogout() {
    toast.success("Logout Successful");
  }

  return (
    <SignOutButton redirectUrl="/">
      <button className="w-full px-2 py-1.5 text-left" onClick={handleLogout}>
        Logout
      </button>
    </SignOutButton>
  );
}

export default SignOut;
