"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

const staticImages = [
  {
    id: 1, // Optional id for reference
    imageUrl: "/assets/images/health-blog.png",
    altText: "HEALTH BLOG",
  },
  {
    id: 2,
    imageUrl: "/assets/images/service-website.png",
    altText: "SERVICE WEBSITE",
  },
  {
    id: 3,
    imageUrl: "/assets/images/service-website-2.png",
    altText: "SERVICE WEBSITE 2",
  },
  {
    id: 3,
    imageUrl: "/assets/images/apk-website.png",
    altText: "APK WEBSITE",
  },
];

export default function ProductCarousel() {
  return (
    <Carousel
      className="w-full mt-16"
      opts={{
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 2000,
          stopOnInteraction: false,
          stopOnMouseEnter: false,
        }),
      ]}
    >
      <CarouselContent>
        {staticImages.map((image) => (
          <CarouselItem key={image.id}>
            <div className="relative mx-auto">
              <Image
                alt={image.altText}
                src={image.imageUrl}
                width="0"
                height="0"
                sizes="100vw"
                className="w-full h-auto" // Add blur filter class
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <h2 className="bg-black border text-sm md:text-3xl font-bold p-2 text-white">
                  {image.altText} {/* Use altText as title */}
                </h2>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
