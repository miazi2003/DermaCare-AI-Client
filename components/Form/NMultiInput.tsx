import React from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
    name: string;
    label?: string;
    placeholder?: string;
};

const MultiInput = ({ name, label, placeholder }: Props) => {
    const { control } = useFormContext();

    const { fields, append, remove } = useFieldArray({
        control,
        name,
    });

    return (
        <div className="flex flex-col gap-2 mb-4">
            {label && <label className="font-medium text-sm">{label}</label>}

            {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-center">
                    <Controller
                        control={control}
                        name={`${name}.${index}`}
                        render={({ field }) => (
                            <Input
                                {...field}
                                placeholder={placeholder || `Item ${index + 1}`}
                                className="py-5"
                            />
                        )}
                    />

                    <Button
                        type="button"
                        variant="destructive"
                        onClick={() => remove(index)}
                    >
                        Remove
                    </Button>
                </div>
            ))}

            <Button
                type="button"
                variant="outline"
                onClick={() => append("")}
                className="w-fit"
            >
                + Add
            </Button>
        </div>
    );
};

export default MultiInput;
