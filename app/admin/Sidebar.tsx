"use client";

import { Button } from "@/components/ui/button";
import { adminLinks } from "@/lib/links";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Sidebar() {
  const pathname = usePathname();

  return (
    <aside>
      {adminLinks.map((link) => {
        const { href, label } = link;
        const isActive = pathname === link.href;
        const variant = isActive ? "default" : "ghost";

        return (
          <Button
            key={href}
            asChild
            className="mb-4 w-full justify-start font-normal capitalize"
            variant={variant}
          >
            <Link href={href}>{label}</Link>
          </Button>
        );
      })}
    </aside>
  );
}

export default Sidebar;
