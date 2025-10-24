import EmptyList from "@/components/global/EmptyList";
import SectionTitle from "@/components/global/SectionTitle";
import ProductsGrid from "@/components/products/ProductsGrid";
import { fetchFeaturedProductsAction } from "@/lib/actions";

async function Featured() {
  const products = await fetchFeaturedProductsAction();

  if (products.length === 0) return <EmptyList />;
  return (
    <section className="pt-24">
      <SectionTitle text="Featured products" />
      <ProductsGrid products={products} />
    </section>
  );
}

export default Featured;
