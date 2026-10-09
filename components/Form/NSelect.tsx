/* eslint-disable @typescript-eslint/no-unused-vars */
import { Input } from '@/components/ui/input';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type Props = {
    type?: string,
    name: string,
    placeholder?: string,
    label?: string,
    items: { label: string; value: string }[]
}

const NSelect = ({ type, name, placeholder, label, items }: Props) => {
    const { control } = useFormContext();
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <div className="flex flex-col mb-4">
                    <label htmlFor={name} className="mb-1 font-medium text-sm">
                        {label}
                    </label>
                    <div>
                        <Select onValueChange={(val) => field.onChange(val)}
                            value={field.value || undefined}>
                            <SelectTrigger className="w-full py-5">
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {items.map((opt) => (
                                        <SelectItem key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    {fieldState.error && (
                        <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                    )}
                </div>
            )}
        />
    );
};



export default NSelect;

