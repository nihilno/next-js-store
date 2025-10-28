import { CardSignInButton } from "@/components/form/Buttons";
import { fetchFavoriteId } from "@/lib/actions";
import { auth } from "@clerk/nextjs/server";
import FavoriteToggleForm from "./FavoriteToggleForm";

export async function FavoriteToggleButton({
  productId,
}: {
  productId: string;
}) {
  const { userId } = await auth();
  if (!userId) return <CardSignInButton />;

  const favoriteId = await fetchFavoriteId({ productId });
  return <FavoriteToggleForm productId={productId} favoriteId={favoriteId} />;
}
