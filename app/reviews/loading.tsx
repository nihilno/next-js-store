"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function loading() {
  return (
    <section className="mt-4 grid gap-6 md:grid-cols-2">
      <ReviewLoadingCard />
      <ReviewLoadingCard />
    </section>
  );
}

function ReviewLoadingCard() {
  return (
    <Card className="pt-6">
      <CardHeader>
        <div className="flex items-center">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="ml-4">
            <Skeleton className="mb-2 h-4 w-[150px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}

export default loading;
