import Image from "next/image";
import ArmchairImage from "@/public/images/armchair.png";

export default async function Page() {
  return (
    <section className="flex flex-col items-center">
      <h1 className="flex flex-wrap items-center justify-center gap-2 text-4xl leading-none font-bold tracking-wide sm:gap-x-6 sm:text-6xl">
        We love
        <span className="bg-primary rounded-lg px-4 py-2 tracking-widest text-white shadow-[0_3px_14px_var(--color-primary)]">
          store
        </span>
      </h1>
      <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-center text-lg leading-8 tracking-wide">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero hic
        distinctio ducimus temporibus nobis autem laboriosam repellat, magni
        fugiat minima excepturi neque, tenetur possimus nihil atque! Culpa nulla
        labore nam?
      </p>
      <div className="animate-float relative mt-16 grid h-32 w-32 place-items-center md:h-86 md:w-86">
        <Image
          src={ArmchairImage}
          alt="Omg, a floating armchair!"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-full object-cover"
        />
      </div>
    </section>
  );
}
