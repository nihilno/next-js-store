import EmptyList from "@/components/global/EmptyList";
import SectionTitle from "@/components/global/SectionTitle";
import ProductsGrid from "@/components/products/ProductsGrid";
import { fetchFeaturedProductsAction } from "@/lib/actions";

async function Featured() {
  const products = await fetchFeaturedProductsAction();

  if (products.length === 0)
    return (
      <div className="flex w-full items-center justify-center pt-24">
        <EmptyList />
      </div>
    );

  return (
    <section className="pt-24">
      <SectionTitle text="Featured products" />
      <ProductsGrid products={products} />
    </section>
  );
}

export default Featured;
