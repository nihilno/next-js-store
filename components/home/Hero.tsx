import HeroCarousel from "@/components/home/HeroCarousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Hero() {
  return (
    <section className="grid grid-cols-1 items-center gap-24 lg:grid-cols-2">
      <div>
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
          We are changing the way people shop
        </h1>
        <p className="text-muted-foreground mt-8 max-w-xl text-lg leading-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
          quaerat ipsum deserunt officia exercitationem! Qui reiciendis
          excepturi corporis fugiat et?
        </p>
        <Button asChild size="lg" motion="lift" className="mt-10">
          <Link href="/products" className="capitalize">
            Our products
          </Link>
        </Button>
      </div>
      <HeroCarousel />
    </section>
  );
}

export default Hero;
