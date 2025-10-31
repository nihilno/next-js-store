"use client";

import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import SelectProductAmount, {
  Mode,
} from "@/components/product/SelectProductAmount";
import { removeCartItemAction, updateCartItemAction } from "@/lib/actions";
import { useState } from "react";
import { toast } from "sonner";

function ThirdCol({ quantity, id }: { quantity: number; id: string }) {
  const [amount, setAmount] = useState(quantity);
  const [isLoading, setIsLoading] = useState(false);

  async function handleAmountChange(value: number) {
    setIsLoading(true);
    toast.info("Updating...");
    const result = await updateCartItemAction({
      amount: value,
      cartItemId: id,
    });
    setAmount(value);
    toast.info(result.message);
    setIsLoading(false);
  }

  return (
    <div className="md:ml-8">
      <SelectProductAmount
        mode={Mode.CartItem}
        amount={amount}
        setAmount={handleAmountChange}
        isLoading={false}
      />
      <FormContainer action={removeCartItemAction}>
        <input type="hidden" name="id" value={id} />
        <SubmitButton size="sm" className="mt-4" text="remove" />
      </FormContainer>
    </div>
  );
}

export default ThirdCol;
