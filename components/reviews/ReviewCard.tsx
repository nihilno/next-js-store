import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Comment from "./Comment";
import Rating from "./Rating";

type ReviewCardProps = {
  reviewInfo: {
    comment: string;
    rating: number;
    name: string;
    image: string;
  };
  children?: React.ReactNode;
};

function ReviewCard({ reviewInfo, children }: ReviewCardProps) {
  const { comment, rating, name, image } = reviewInfo;

  return (
    <Card className="relative pt-6">
      <CardHeader>
        <div className="flex items-center">
          <Image
            src={image}
            alt={name}
            className="h-12 w-12 rounded-full object-cover"
            width={48}
            height={48}
          />

          <div className="ml-4">
            <h3 className="mb-1 text-sm font-bold capitalize">{name}</h3>
            <Rating rating={rating} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Comment comment={comment} />
      </CardContent>
      <div className="absolute top-3 right-3">{children}</div>
    </Card>
  );
}

export default ReviewCard;
