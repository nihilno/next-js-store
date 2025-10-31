import { Card } from "@/components/ui/card";
import { CartItemWithProduct } from "@/lib/types";
import { FirstCol, FourthCol, SecondCol } from "./CartItemCols";
import ThirdCol from "./ThirdCol";

function CartItemsList({ cartItems }: { cartItems: CartItemWithProduct[] }) {
  return (
    <div>
      {cartItems.map((cartItem) => {
        const { id, amount } = cartItem;
        const { image, name, company, price, id: productId } = cartItem.product;

        return (
          <Card
            key={id}
            className="mb-8 flex flex-col flex-wrap gap-4 p-6 md:flex-row"
          >
            <FirstCol name={name} image={image} />
            <SecondCol name={name} company={company} productId={productId} />
            <ThirdCol id={id} quantity={amount} key={id} />
            <FourthCol price={price} />
          </Card>
        );
      })}
    </div>
  );
}

export default CartItemsList;
