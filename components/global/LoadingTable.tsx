import { Skeleton } from "@/components/ui/skeleton";

function LoadingTable({ amount = 5 }: { amount?: number }) {
  const tableRows = Array.from({ length: amount }, (_, index) => {
    return (
      <div className="mb-4" key={index}>
        <Skeleton className="h-8 w-full rounded" />
      </div>
    );
  });

  return <>{tableRows}</>;
}

export default LoadingTable;
