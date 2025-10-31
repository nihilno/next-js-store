import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function RatingInput({ name, label }: { name: string; label?: string }) {
  const numbers = Array.from({ length: 5 }, (_, index) => {
    const value = index + 1;
    return value.toString();
  }).reverse();

  return (
    <div className="mb-6 max-w-xs space-y-2">
      <Label htmlFor={name} className="capitalize">
        {label || name}
      </Label>

      <Select defaultValue={numbers[0]} name={name} required>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {numbers.map((number) => (
            <SelectItem key={number} value={number} className="cursor-pointer">
              {number}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default RatingInput;
