"use client";

import { cn } from "@workspace/ui/lib";
import { Button, Typography } from "@workspace/ui/components";
import { Type } from "@/lib/types/schema.db";

interface FilterState {
  maxSize: number;
  minSize: number;
  type: string;
}

interface FilterFilesProps {
  filter: FilterState;
  onFilterChange: (filter: FilterState) => void;
  onApply: () => void;
  onClear: () => void;
  types: Type[];
}

const FilterFiles = ({
  filter,
  onFilterChange,
  onApply,
  onClear,
  types,
}: FilterFilesProps) => {
  const update = (patch: Partial<FilterState>) =>
    onFilterChange({ ...filter, ...patch });

  return (
    <div className="flex flex-col">
      <div className="flex items-end gap-4 flex-wrap">
        <div className="flex flex-col gap-1">
          <Typography
            as="span"
            type="body"
            className="text-sm text-secondary"
          >
            Min Size (KB)
          </Typography>
          <input
            type="number"
            min={0}
            value={filter.minSize}
            onChange={(e) => update({ minSize: Number(e.target.value) })}
            className="p-2 rounded-xl bg-elevated dark:bg-card-nested w-32"
            placeholder="0"
          />
        </div>
        <div className="flex flex-col gap-1">
          <Typography
            as="span"
            type="body"
            className="text-sm text-secondary"
          >
            Max Size (KB)
          </Typography>
          <input
            type="number"
            min={0}
            value={filter.maxSize}
            onChange={(e) => update({ maxSize: Number(e.target.value) })}
            className="p-2 rounded-xl bg-elevated dark:bg-card-nested w-32"
            placeholder="∞"
          />
        </div>
        <div className="flex gap-2">
          <Button onClick={onApply}>Apply Filters</Button>
          <Button onClick={onClear}>Clear filters</Button>
        </div>
      </div>
      <div className="w-full my-5 flex flex-wrap gap-2">
        {types.map((type: Type, idx: number) => (
          <button
            key={idx}
            onClick={() =>
              update({ type: filter.type === type.name ? "" : type.name })
            }
            className={cn(
              "p-2 rounded-xl border border-solid border-slate-300 dark:border-muted transition-colors font-medium",
              "hover:scale-105 transform transition-transform duration-300",
              filter.type === type.name
                ? "bg-primary text-white border-primary"
                : "bg-elevated dark:bg-card text-foreground",
            )}
          >
            <Typography as="p" type="body" className="capitalize">
              {type.name}
            </Typography>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterFiles;
