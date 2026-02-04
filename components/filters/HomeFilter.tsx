"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { removeKeysFromUrlQuery } from "@/lib/url";
import { formUrlQuery } from "@/lib/url";
const filters = [
  {
    name: "Newest",
    value: "newest",
  },
  {
    name: "Most Recent",
    value: "recent",
  },
  {
    name: "Recommended",
    value: "recommended",
  },
  {
    name: "Unanswered",
    value: "unanswered",
  },
  {
    name: "Most Popular",
    value: "popular",
  },
];

const HomeFilter = () => {
  const searchParams = useSearchParams();
  const filterParams = searchParams.get("filter") || "";
  const [activeFilter, setActiveFilter] = useState(filterParams || "");
  const router = useRouter();

  const handleTypeClick = (filter: string) => {
    let newUrl = "";

    if (filter === activeFilter) {
      setActiveFilter("");

      newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["filter"],
      });
    } else {
      setActiveFilter(filter.toLowerCase());

      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: filter,
      });
    }

    router.push(newUrl, { scroll: false });
  };
  return (
    <div className="mt-10 hidden flex-wrap gap-3 sm:flex">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          className={cn(
            `body-medium rounded-lg px-6 py-3 capitalize shadow-none`,
            activeFilter === filter.value
              ? "bg-primary-100 text-primary-500 hover:bg-primary-100 dark:bg-dark-400 dark:text-primary-500 dark:hover:bg-dark-400"
              : "bg-light-800 text-light-500 hover:bg-light-800 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-300"
          )}
          onClick={() => {
            handleTypeClick(filter.value);
          }}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilter;
