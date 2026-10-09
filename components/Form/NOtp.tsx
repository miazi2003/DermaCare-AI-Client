/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"

type Props = {
    type?: string,
    name: string,
    placeholder?: string,
    label?: string
}

const NOtp = ({ type, name, placeholder, label }: Props) => {
    const { control } = useFormContext();
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <div className="flex flex-col mb-4"> {/* Stack label above input */}
                    <label htmlFor={name} className="mb-1 font-medium text-sm">
                        {label}
                    </label>
                    <InputOTP maxLength={4} {...field}>
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                        </InputOTPGroup>
                    </InputOTP>
                    {fieldState.error && (
                        <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                    )}
                </div>
            )}
        />
    );
};



export default NOtp;