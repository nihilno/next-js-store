import { LucideShoppingCart } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { fetchCartItems } from "@/lib/actions";

async function CartButton() {
  const numItemsInCart = await fetchCartItems();

  return (
    <Button
      asChild
      variant="outline"
      size="icon"
      className="relative grid place-items-center"
    >
      <Link href="/cart">
        <LucideShoppingCart />
        <span className="bg-primary absolute -top-3 -right-3 grid h-6 w-6 place-items-center rounded-full text-xs text-white">
          {numItemsInCart}
        </span>
      </Link>
    </Button>
  );
}

export default CartButton;
