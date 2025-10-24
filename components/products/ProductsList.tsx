import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import FavoriteToggleButton from "./FavoriteToggleButton";

function ProductsList({ products }: { products: Product[] }) {
  return (
    <div className="mt-12 grid gap-y-8">
      {products.map((product) => {
        const { name, price, image, company, description, id } = product;
        const dollarsAmount = formatCurrency(price);
        const productId = id;

        return (
          <article key={id} className="group relative">
            <Link href={`/products/${productId}`}>
              <Card className="transform transition-shadow duration-500 group-hover:shadow-xl">
                <CardContent className="grid gap-y-4 px-6 pt-6 md:grid-cols-3">
                  <div className="relative h-64 md:h-48 md:w-48">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                      priority
                      className="w-full rounded object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-2 text-left">
                    <h2 className="text-2xl font-semibold capitalize">
                      {name}
                    </h2>
                    <p className="max-w-40ch text-muted-foreground truncate">
                      {description}
                    </p>
                    <h4 className="mt-auto">{company}</h4>
                  </div>
                  <p className="bg-muted h-fit w-fit rounded p-2 text-lg md:ml-auto">
                    {dollarsAmount}
                  </p>
                </CardContent>
              </Card>
            </Link>
            <div className="absolute right-8 bottom-8 z-50">
              <FavoriteToggleButton productId={productId} />
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default ProductsList;
