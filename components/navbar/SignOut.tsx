"use client";

import { SignOutButton } from "@clerk/nextjs";
import { toast } from "sonner";

function SignOut() {
  function handleLogout() {
    toast("Logout Successful", {
      duration: 4000,
    });
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
