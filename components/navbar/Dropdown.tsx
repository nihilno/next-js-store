"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { links } from "@/lib/links";
import { LucideAlignLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Dropdown() {
  const pathname = usePathname();

  return (
    <DropdownMenu key={pathname} modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex max-w-[100px] gap-4">
          <LucideAlignLeft className="w6 h6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start" sideOffset={10}>
        {links.map((link) => (
          <DropdownMenuItem key={link?.label}>
            <Link href={link?.href} className="w-full px-2 py-1.5 capitalize">
              {link?.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Dropdown;
