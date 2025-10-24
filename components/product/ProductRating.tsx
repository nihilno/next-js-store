import { IoStar } from "react-icons/io5";

function ProductRating({ productId }: { productId: string }) {
  const rating = 4.2;
  const count = 25;
  const countValue = `(${count}) reviews`;
  const className = `flex gap-1 items-center text-md mt-1 mb-4`;

  return (
    <span className={className}>
      <IoStar className="h-4 w-4" color="oklch(0.645 0.246 16.439)" />
      {rating} {countValue}
    </span>
  );
}

export default ProductRating;
