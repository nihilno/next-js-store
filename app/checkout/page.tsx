import CheckoutClient from "@/components/checkout/CheckoutClient";
import LoadingContainer from "@/components/global/LoadingContainer";
import { Suspense } from "react";

export default function CheckoutPage() {
  return (
    <Suspense fallback={<LoadingContainer />}>
      <CheckoutClient />
    </Suspense>
  );
}
