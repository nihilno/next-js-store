import SectionTitle from "@/components/global/SectionTitle";
import ProductsGrid from "@/components/products/ProductsGrid";
import { fetchUserFavoritess } from "@/lib/actions";

export default async function Page() {
  const favorites = await fetchUserFavoritess();
  if (favorites.length === 0)
    return <SectionTitle text="You have no favorites yet." />;

  return (
    <div>
      <SectionTitle text="Favorites" />
      <ProductsGrid products={favorites.map((fav) => fav.product)} />
    </div>
  );
}
