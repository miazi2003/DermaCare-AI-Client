/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import * as React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ClockIcon } from "lucide-react";

type Props = {
  name: string;
  label: string;
  placeholder?: string;
};

const NTime = ({ name, label, placeholder }: Props) => {
  const { control } = useFormContext();
  const [open, setOpen] = React.useState(false);

  // 🔥 Time range config
  const START_HOUR = 8;  // 08:00
  const END_HOUR = 24;   // 23:30

  // Generate times in 30-minute intervals starting from 08:00
  const times = React.useMemo(() => {
    return Array.from(
      { length: (END_HOUR - START_HOUR) * 2 },
      (_, i) => {
        const hour = START_HOUR + Math.floor(i / 2);
        const minute = i % 2 === 0 ? "00" : "30";
        return `${hour.toString().padStart(2, "0")}:${minute}`;
      }
    );
  }, []);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-1 w-full">
          <Label htmlFor={name}>{label}</Label>

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id={name}
                type="button"
                className="w-full justify-between font-normal py-5"
              >
                {field.value || placeholder || "Select time"}
                <ClockIcon className="ml-2 h-4 w-4 opacity-60" />
              </Button>
            </PopoverTrigger>

            <PopoverContent
              className="w-48 max-h-60 overflow-auto p-2"
              align="start"
            >
              <div className="flex flex-col gap-1">
                {times.map((time) => (
                  <button
                    key={time}
                    type="button"
                    className="text-left px-2 py-1 rounded hover:bg-gray-100"
                    onClick={() => {
                      field.onChange(time);
                      setOpen(false);
                    }}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>

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

export default NTime;
