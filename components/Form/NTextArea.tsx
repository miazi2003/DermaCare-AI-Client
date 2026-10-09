/* eslint-disable @typescript-eslint/no-unused-vars */
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type Props = {
    name: string,
    placeholder: string,
    label?: string
}

const NTextArea = ({ name, placeholder, label }: Props) => {
    const { control } = useFormContext();
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <div className="flex flex-col mb-4 w-full">
                    <label htmlFor={name} className="mb-1 font-medium text-sm">
                        {label}
                    </label>
                    <Textarea id={name} placeholder={placeholder} {...field} className='w-full' />
                    {fieldState.error && (
                        <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                    )}
                </div>
            )}
        />
    );
};



export default NTextArea;