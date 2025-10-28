export const dynamic = "force-dynamic";
export const revalidate = 0;

import LoadingContainer from "@/components/global/LoadingContainer";
import Featured from "@/components/home/Featured";
import Hero from "@/components/home/Hero";
import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <Hero />
      <Suspense fallback={<LoadingContainer />}>
        <Featured />
      </Suspense>
    </>
  );
}
