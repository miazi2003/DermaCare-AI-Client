"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import * as React from "react";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  name: string;
  label?: string;
  placeholder?: string;
};

const NCalendar = ({ name, label, placeholder }: Props) => {
  const { control } = useFormContext();
  const [open, setOpen] = React.useState(false);

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-1 mb-4 w-full">
          <Label htmlFor={name}>{label}</Label>
          <div>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild className="py-5">
                <Button
                  variant="outline"
                  id={name}
                  className="w-full justify-between font-normal"
                >
                  {field.value
                    ? new Date(field.value).toLocaleDateString()
                    : placeholder || "Select date"}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0 w-full" align="start">
                <Calendar
                  mode="single"
                  selected={field.value ? new Date(field.value) : undefined}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    if (date) field.onChange(date.toISOString());
                    setOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
          {fieldState.error && (
            <p className="text-red-500 text-sm mt-1">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
};

export default NCalendar;
