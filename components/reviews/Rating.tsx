import { FaRegStar, FaStar } from "react-icons/fa";

function Rating({ rating }: { rating: number }) {
  const stars = Array.from({ length: 5 }, (_, index) => index + 1 <= rating);

  return (
    <div className="flex items-center gap-1">
      {stars.map((isFilled, index) => {
        const className = `w-4 h-4 ${isFilled ? "text-primary" : "text-foreground"}`;

        return isFilled ? (
          <FaStar key={index} className={className} />
        ) : (
          <FaRegStar key={index} className={className} />
        );
      })}
    </div>
  );
}

export default Rating;
