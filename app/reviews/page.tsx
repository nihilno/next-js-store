import { IconButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import SectionTitle from "@/components/global/SectionTitle";
import ReviewCard from "@/components/reviews/ReviewCard";
import {
  deleteReviewAction,
  fetchProductReviewsByUserAction,
} from "@/lib/actions";

export default async function Page() {
  const reviews = await fetchProductReviewsByUserAction();
  if (reviews.length === 0)
    return <SectionTitle text="You have no reviews yet" />;

  return (
    <>
      <SectionTitle text="Your reviews" />
      <section className="mt-4 grid gap-6 md:grid-cols-2">
        {reviews.map((review) => {
          const { comment, rating } = review;
          const { name, image } = review.product;
          const reviewInfo = { comment, rating, name, image };
          return (
            <ReviewCard key={review.id} reviewInfo={reviewInfo}>
              <DeleteReview reviewId={review.id} />
            </ReviewCard>
          );
        })}
      </section>
    </>
  );
}

function DeleteReview({ reviewId }: { reviewId: string }) {
  const deleteReview = deleteReviewAction.bind(null, { reviewId });
  return (
    <FormContainer action={deleteReview}>
      <IconButton actionType="delete" />
    </FormContainer>
  );
}
