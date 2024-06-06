"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

interface IData {
  value: string;
  label: string;
}

interface IProps {
  datas: IData[];
  value: string;
  placeholder?: string;
  label?: string;
  error?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  width?: string;
}

export const Combobox: React.FC<IProps> = ({
  datas,
  value,
  placeholder = "Select option...",
  label,
  onChange,
  disabled = false,
  width = "w-full",
}) => {
  const [open, setOpen] = useState(false);
  const [localValue, setValue] = useState(value);

  const handleSelect = (currentValue: string) => {
    const newValue = currentValue === localValue ? "" : currentValue;
    setValue(newValue);
    setOpen(false);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className={cn("space-y-2", width)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-white">
          {label}
        </label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn("justify-between", width)}
            disabled={disabled}
          >
            <p className="opacity-60">
              {localValue
                ? datas.find((data) => data.value === localValue)?.label
                : placeholder}
            </p>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className={cn("p-0", width)}>
          <Command>
            <CommandInput
              placeholder={`Search ${placeholder.toLowerCase()}...`}
            />
            <CommandList>
              <CommandEmpty>No {placeholder.toLowerCase()} found.</CommandEmpty>
              <CommandGroup>
                {datas.map((data) => (
                  <CommandItem
                    key={data.value}
                    value={data.value}
                    onSelect={() => handleSelect(data.value)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        localValue === data.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {data.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
