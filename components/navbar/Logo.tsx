import Link from "next/link";
import { IoStorefront } from "react-icons/io5";
import { Button } from "../ui/button";

function Logo() {
  return (
    <Button size="icon" asChild>
      <Link href="/">
        <IoStorefront className="h-6 w-6" />
      </Link>
    </Button>
  );
}

export default Logo;
