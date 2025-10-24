import ProductsContainer from "@/components/products/ProductsContainer";
import { fetchAllProductsAction } from "@/lib/actions";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const search = resolvedSearchParams.search || "";
  const products = await fetchAllProductsAction({ search });

  return <ProductsContainer products={products} />;
}
