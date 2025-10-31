import { Separator } from "@/components/ui/separator";

function SectionTitle({
  text,
  border = true,
}: {
  text: string;
  border?: boolean;
}) {
  return (
    <div>
      <h2 className="mb-8 text-3xl font-medium tracking-wider first-letter:uppercase">
        {text}
      </h2>
      {border && <Separator />}
    </div>
  );
}

export default SectionTitle;
