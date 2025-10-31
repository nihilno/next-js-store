"use client";

import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import TextAreaInput from "@/components/form/TextAreaInput";
import RatingInput from "@/components/reviews/RatingInput";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createReviewAction } from "@/lib/actions";
import { useUser } from "@clerk/nextjs";
import { useEffect, useRef, useState } from "react";

function SubmitReview({ productId }: { productId: string }) {
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
  const { user } = useUser();

  const prevVisibleRef = useRef(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const becameVisible = isReviewFormVisible && !prevVisibleRef.current;
    prevVisibleRef.current = isReviewFormVisible;

    if (becameVisible && cardRef.current) {
      cardRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [isReviewFormVisible]);

  return (
    <div>
      <Button
        size="lg"
        className="capitalize"
        motion="lift"
        onClick={() => setIsReviewFormVisible((prev) => !prev)}
      >
        {isReviewFormVisible ? "Hide review" : "Leave review"}
      </Button>

      {isReviewFormVisible && (
        <Card ref={cardRef} className="mt-8 p-8">
          <FormContainer action={createReviewAction}>
            <input type="hidden" name="productId" value={productId} />
            <input
              type="hidden"
              name="authorName"
              value={user?.firstName || "user"}
            />
            <input type="hidden" name="authorImageUrl" value={user?.imageUrl} />
            <RatingInput name="rating" />
            <TextAreaInput name="comment" defaultValue="Outstanding product!" />
            <SubmitButton className="mt-4" />
          </FormContainer>
        </Card>
      )}
    </div>
  );
}

export default SubmitReview;
