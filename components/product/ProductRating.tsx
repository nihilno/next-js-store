import { fetchProductRatingAction } from "@/lib/actions";
import { FaStar } from "react-icons/fa";

async function ProductRating({ productId }: { productId: string }) {
  const { count, rating } = await fetchProductRatingAction(productId);

  const countValue = `(${count}) reviews`;
  const className = `flex gap-1 items-center text-md mt-1 mb-4`;

  return (
    <span className={className}>
      <FaStar className="h-4 w-4" color="oklch(0.645 0.246 16.439)" />
      {rating} {countValue}
    </span>
  );
}

export default ProductRating;
