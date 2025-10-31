import AddToCart from "@/components/product/AddToCart";
import Breadcrumbs from "@/components/product/Breadcrumbs";
import ProductRating from "@/components/product/ProductRating";
import ShareButton from "@/components/product/ShareButton";
import { FavoriteToggleButton } from "@/components/products/FavoriteToggleButton";
import ProductReviews from "@/components/reviews/ProductReviews";
import SubmitReview from "@/components/reviews/SubmitReview";
import {
  fetchSingleProductAction,
  findExistingReviewAction,
} from "@/lib/actions";
import { formatCurrency } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await fetchSingleProductAction(id);
  const { name, image, company, description, price } = product;
  const dollarsAmount = formatCurrency(price);

  const { userId } = await auth();
  const reviewDoesNotExist =
    userId && !(await findExistingReviewAction(userId, product.id));

  return (
    <section>
      <Breadcrumbs name={product.name} />
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        <div className="relative h-full">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
            priority
            className="w-full rounded object-cover"
          />
        </div>
        <div>
          <div className="flex items-center gap-x-8">
            <h1 className="text-3xl font-bold capitalize">{name}</h1>
            <div className="flex items-center gap-3">
              <FavoriteToggleButton productId={id} />
              <ShareButton productId={id} name={name} />
            </div>
          </div>
          <ProductRating productId={id} />
          <h4 className="mt-2 text-xl">{company}</h4>
          <p className="text-md bg-muted mt-3 inline-block rounded p-2">
            {dollarsAmount}
          </p>
          <p className="text-muted-foreground mt-6 leading-8">{description}</p>
          <AddToCart productId={id} />
        </div>
      </div>

      <ProductReviews productId={id} />
      {reviewDoesNotExist && <SubmitReview productId={id} />}
    </section>
  );
}
