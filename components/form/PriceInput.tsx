import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const name = "price";
type PriceInputProps = {
  defaultValue?: number;
};

function PriceInput({ defaultValue }: PriceInputProps) {
  return (
    <div className="mb-4 space-y-2">
      <Label htmlFor={name} className="capitalize">
        Price ($)
      </Label>
      <Input
        id={name}
        name={name}
        type="number"
        defaultValue={defaultValue || 100}
        min={0}
        required
      ></Input>
    </div>
  );
}

export default PriceInput;
