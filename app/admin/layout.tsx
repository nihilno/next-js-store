import Sidebar from "@/app/admin/Sidebar";
import { Separator } from "@/components/ui/separator";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h2 className="pl-4 text-2xl">Dashboard</h2>
      <Separator className="mt-2" />
      <section className="mt-12 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-2">
          <Sidebar />
        </div>
        <div className="px-4 lg:col-span-10">{children}</div>
      </section>
    </>
  );
}

export default layout;
