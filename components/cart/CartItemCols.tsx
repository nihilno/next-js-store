import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export function FirstCol({ name, image }: { name: string; image: string }) {
  return (
    <div className="relative h-24 w-24 sm:h-32 sm:w-32">
      <Image
        src={image}
        alt={name}
        fill
        sizes="(max-width:786px) 100vw, (max-width:1200) 50vw, 33vw "
        priority
        className="w-full rounded-md object-cover"
      />
    </div>
  );
}

export function SecondCol({
  name,
  company,
  productId,
}: {
  name: string;
  company: string;
  productId: string;
}) {
  return (
    <div className="sm:w-48">
      <Link href={`/products/${productId}`}>
        <h3 className="font-medium capitalize hover:underline">{name}</h3>
        <h4 className="mt-2 text-xs capitalize">{company}</h4>
      </Link>
    </div>
  );
}

export function FourthCol({ price }: { price: number }) {
  return <p className="font-medium md:ml-auto">{formatCurrency(price)}</p>;
}
