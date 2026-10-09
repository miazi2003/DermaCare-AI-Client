"use client";

import { Controller, useFormContext } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
type Props = {
    name: string;
    label: string;
    placeholder?: string;
    defaultCountry?: string;
};

const NPhone = ({ name, label, placeholder, defaultCountry }: Props) => {
    const { control } = useFormContext();
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <div className="flex flex-col gap-1 mb-4 w-full">
                    <label htmlFor={name} className="text-sm font-medium text-white">
                        {label}
                    </label>
                    <div className="w-full !bg-[#122626]">
                        <PhoneInput
                            country={defaultCountry}
                            value={field.value}
                            onChange={field.onChange}
                            inputProps={{
                                name,
                                id: name,
                                placeholder: placeholder || "Enter phone number",
                            }}
                            containerClass="w-full !bg-[#122626]"
                            inputClass="md:min-w-full border border-gray-300 !bg-[#122626] rounded-md px-3 py-5 focus:outline-none focus:ring-2 focus:ring-gray-300"
                            buttonClass="border !bg-[#122626] border-gray-300 rounded-l-md"
                            dropdownClass="!bg-white rounded-md shadow-lg text-black"
                            enableSearch
                            specialLabel="!bg-[#122626]"
                        />
                    </div>
                    {fieldState.error && (
                        <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                    )}
                </div>
            )}
        />
    );
};

export default NPhone;
