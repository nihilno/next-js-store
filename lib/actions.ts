import db from "@/lib/db";
import { redirect } from "next/navigation";

export async function fetchFeaturedProductsAction() {
  const products = await db.product.findMany({
    where: {
      featured: true,
    },
  });
  return products;
}

export async function fetchAllProductsAction({
  search = "",
}: {
  search: string;
}) {
  const products = await db.product.findMany({
    where: {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { company: { contains: search, mode: "insensitive" } },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return products;
}

export async function fetchSingleProduct(productId: string) {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) redirect("/products");
  return product;
}
