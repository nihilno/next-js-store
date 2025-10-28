"use client";

import SignOut from "@/components/navbar/SignOut";
import User from "@/components/navbar/User";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { links } from "@/lib/links";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { LucideAlignLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Dropdown() {
  const pathname = usePathname();
  // const { user } = useUser();
  // const isAdmin = user?.id === process.env.ADMIN_USER_ID;

  return (
    <DropdownMenu key={pathname} modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex max-w-[100px] gap-4">
          <LucideAlignLeft className="h-6 w-6" />
          <User />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start" sideOffset={10}>
        <SignedOut>
          <DropdownMenuItem>
            <SignInButton mode="modal">
              <button className="w-full px-2 py-1.5 text-left">Login</button>
            </SignInButton>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignUpButton mode="modal">
              <button className="w-full px-2 py-1.5 text-left">Register</button>
            </SignUpButton>
          </DropdownMenuItem>
        </SignedOut>
        <SignedIn>
          {links.map((link) => {
            // if (link.label === "dashboard" && !isAdmin) return null;
            return (
              <DropdownMenuItem key={link?.label}>
                <Link
                  href={link?.href}
                  className="w-full px-2 py-1.5 capitalize"
                >
                  {link?.label}
                </Link>
              </DropdownMenuItem>
            );
          })}
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignOut />
          </DropdownMenuItem>
        </SignedIn>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Dropdown;
