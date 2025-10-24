import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import heroOne from "@/public/images/hero1.jpg";
import heroTwo from "@/public/images/hero2.jpg";
import heroThree from "@/public/images/hero3.jpg";
import heroFour from "@/public/images/hero4.jpg";
import Image from "next/image";

const carouselImages = [heroOne, heroTwo, heroThree, heroFour];

function HeroCarousel() {
  return (
    <div className="hidden lg:block">
      <Carousel>
        <CarouselContent>
          {carouselImages.map((image, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="p-2 select-none">
                  <Image
                    src={image}
                    alt="Hero"
                    priority={index === 0}
                    className="h-96 w-full rounded-md object-cover"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default HeroCarousel;
