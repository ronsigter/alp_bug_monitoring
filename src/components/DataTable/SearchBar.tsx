"use client";

import { Input } from "@/components/ui/input";
import { useDataTable } from ".";

interface SearchBarProps {
  searchPlaceholder?: string;
  searchColumnName: string;
}

export function SearchBar(props: SearchBarProps) {
  const { table } = useDataTable();

  return (
    <Input
      placeholder={props.searchPlaceholder ?? "Search"}
      value={(table.getColumn(props.searchColumnName)?.getFilterValue() as string) ?? ""}
      onChange={(event) =>
        table.getColumn(props.searchColumnName)?.setFilterValue(event.target.value)
      }
      className="h-8 w-[150px] lg:w-[250px]"
    />
  );
}
