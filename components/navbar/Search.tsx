"use client";

import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

function Search() {
  const searchParams = useSearchParams();
  const initialState = searchParams.get("search")?.toString() || "";
  const [search, setSearch] = useState(initialState);
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set("search", value);
    else params.delete("search");
    replace(`/products${params.toString() ? `?${params.toString()}` : ""}`);
  }, 500);

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  return (
    <Input
      type="search"
      placeholder="Search product..."
      className="dark:bg-card max-w-xs"
      value={search}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        handleSearch(e.target.value);
      }}
    />
  );
}

export default Search;
