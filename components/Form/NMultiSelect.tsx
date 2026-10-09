/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown } from "lucide-react";

type Option = {
    label: string;
    value: string;
};

type Props = {
    name: string;
    label?: string;
    placeholder?: string;
    items: Option[];
};

const NMultiSelect = ({ name, label, placeholder, items }: Props) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => {
                const selectedValues: string[] = field.value || [];

                const selectedLabels = items
                    .filter((item) => selectedValues.includes(item.value))
                    .map((item) => item.label)
                    .join(", ");

                return (
                    <div className="flex flex-col mb-4">
                        {label && (
                            <label className="mb-1 font-medium text-sm">{label}</label>
                        )}

                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="justify-between w-full py-5"
                                >
                                    <span className="truncate text-left">
                                        {selectedLabels || placeholder || "Select options"}
                                    </span>
                                    <ChevronDown className="w-4 h-4 ml-2" />
                                </Button>
                            </PopoverTrigger>

                            <PopoverContent className="w-full p-2">
                                <div className="space-y-2">
                                    {items.map((item) => (
                                        <div
                                            key={item.value}
                                            className="flex items-center space-x-2"
                                        >
                                            <Checkbox
                                                checked={selectedValues.includes(item.value)}
                                                onCheckedChange={(checked) => {
                                                    if (checked) {
                                                        field.onChange([...selectedValues, item.value]);
                                                    } else {
                                                        field.onChange(
                                                            selectedValues.filter(
                                                                (v) => v !== item.value
                                                            )
                                                        );
                                                    }
                                                }}
                                            />
                                            <span className="text-sm">{item.label}</span>
                                        </div>
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
                );
            }}
        />
    );
};

export default NMultiSelect;
