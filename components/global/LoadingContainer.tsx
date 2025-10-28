import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";
import { cx } from "class-variance-authority";

function LoadingContainer({
  amount = 3,
  full = false,
}: {
  amount?: number;
  full?: boolean;
}) {
  return (
    <div
      className={
        full
          ? "grid grid-cols-2 gap-x-6 pt-8"
          : "grid gap-4 pt-12 md:grid-cols-2 lg:grid-cols-3"
      }
      aria-busy="true"
      aria-label="Loading content..."
    >
      {Array.from({ length: amount }).map((_, index) => (
        <LoadingProductSkeleton key={index} full={full} />
      ))}
    </div>
  );
}

function LoadingProductSkeleton({ full = false }: { full?: boolean }) {
  return (
    <Card>
      <CardContent className="p-4">
        {/* <Skeleton
          className={full ? "h-96 w-full rounded" : "h-48 w-full rounded"}
        /> */}
        <Skeleton className={(cx("w-full rounded"), full ? "h-96" : "h-48")} />
        <Skeleton className="mt-4 h-4 w-3/4 rounded" />
        <Skeleton className="mt-4 h-4 w-1/2 rounded" />
      </CardContent>
    </Card>
  );
}

export default LoadingContainer;
