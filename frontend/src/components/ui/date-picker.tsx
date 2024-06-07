"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  value: string;
  onChange: (date: string | undefined) => void;
  buttonClassName?: string;
  popoverClassName?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  buttonClassName,
  popoverClassName,
}) => {
  const [date, setDate] = React.useState<string | undefined>(value);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate?.toISOString());
    if (onChange) {
      onChange(selectedDate?.toISOString());
    }
  };

  return (
    <div className="flex w-full">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
              buttonClassName
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className={cn("w-auto p-0", popoverClassName)}>
          <Calendar
            mode="single"
            selected={date ? new Date(date) : undefined}
            onSelect={handleDateSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
