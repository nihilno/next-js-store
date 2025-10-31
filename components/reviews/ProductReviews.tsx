import { fetchProductsReviewsAction } from "@/lib/actions";
import SectionTitle from "../global/SectionTitle";
import ReviewCard from "./ReviewCard";

async function ProductReviews({ productId }: { productId: string }) {
  const reviews = await fetchProductsReviewsAction(productId);

  return (
    <div className="mt-16">
      <SectionTitle text="product reviews" />
      <div className="my-8 grid gap-8 md:grid-cols-2">
        {reviews.map((review) => {
          const { comment, rating, authorImageUrl, authorName } = review;
          const reviewInfo = {
            comment,
            rating,
            image: authorImageUrl,
            name: authorName,
          };

          return <ReviewCard key={review.id} reviewInfo={reviewInfo} />;
        })}
      </div>
    </div>
  );
}

export default ProductReviews;
