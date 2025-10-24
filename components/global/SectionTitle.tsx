import { Separator } from "@/components/ui/separator";

function SectionTitle({ text }: { text: string }) {
  return (
    <div>
      <h2 className="mb-8 text-3xl font-medium tracking-wider capitalize">
        {text}
      </h2>
      <Separator />
    </div>
  );
}

export default SectionTitle;
