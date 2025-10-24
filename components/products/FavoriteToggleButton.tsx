import { IoHeart } from "react-icons/io5";
import { Button } from "../ui/button";

function FavoriteToggleButton({ productId }: { productId: string }) {
  return (
    <Button size="icon" variant="outline" className="cursor-pointer p-2">
      <IoHeart />
    </Button>
  );
}

export default FavoriteToggleButton;
