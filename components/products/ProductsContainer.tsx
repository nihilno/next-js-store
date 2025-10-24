"use client";

import ProductsGrid from "@/components/products/ProductsGrid";
import ProductsList from "@/components/products/ProductsList";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Product } from "@prisma/client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { IoGrid, IoList } from "react-icons/io5";

function ProductsContainer({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();
  const layout = searchParams.get("layout") || "grid";
  const search = searchParams.get("search") || "";
  const searchTerm = search ? `&search=${encodeURIComponent(search)}` : "";
  const totalProducts = products.length;

  return (
    <>
      <section>
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-medium">
            {totalProducts} product{totalProducts > 1 && "s"}
          </h4>
          <div className="flex gap-x-4">
            <Button
              variant={layout === "grid" ? "default" : "ghost"}
              size="icon"
              asChild
            >
              <Link href={`/products?layout=grid${searchTerm}`}>
                <IoGrid aria-label="Grid view" />
              </Link>
            </Button>
            <Button
              variant={layout === "list" ? "default" : "ghost"}
              size="icon"
              asChild
            >
              <Link href={`/products?layout=list${searchTerm}`}>
                <IoList aria-label="List view" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <Separator className="mt-4" />
      <div>
        {totalProducts === 0 ? (
          <h5 className="mt-16 text-2xl">
            Sorry, no products matched your search.
          </h5>
        ) : layout === "grid" ? (
          <ProductsGrid products={products} />
        ) : (
          <ProductsList products={products} />
        )}
      </div>
    </>
  );
}

export default ProductsContainer;
