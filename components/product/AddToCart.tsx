"use client";

import { addToCartAction } from "@/lib/actions";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import { ProductSignInButton, SubmitButton } from "../form/Buttons";
import FormContainer from "../form/FormContainer";
import SelectProductAmount, { Mode } from "./SelectProductAmount";

function AddToCart({ productId }: { productId: string }) {
  const [amount, setAmount] = useState(1);
  const { userId } = useAuth();

  return (
    <div className="mt-4">
      <SelectProductAmount
        mode={Mode.SingleProduct}
        amount={amount}
        setAmount={setAmount}
      />
      {userId ? (
        <FormContainer action={addToCartAction}>
          <input type="hidden" name="productId" value={productId} />
          <input type="hidden" name="amount" value={amount} />
          <SubmitButton text="add to cart" className="mt-8"></SubmitButton>
        </FormContainer>
      ) : (
        <ProductSignInButton label="add to cart" />
      )}
    </div>
  );
}

export default AddToCart;
