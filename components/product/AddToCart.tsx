import { Button } from "@/components/ui/button";

function AddToCart({ productId }: { productId: string }) {
  return (
    <Button className="mt-8 capitalize" size="lg">
      Add to cart
    </Button>
  );
}

export default AddToCart;
