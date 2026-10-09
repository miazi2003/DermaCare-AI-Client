/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

type PHInputProps = {
  type?: string;
  name: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  control: any;
};

const PHInput = ({
  type = "text",
  name,
  label,
  disabled,
  placeholder,
  control,
}: PHInputProps) => {
  const isPassword = type === "password";
  const [showPassword, setShowPassword] = useState(false);

  // Adjust padding if there's a password toggle
  const inputPaddingClass = isPassword
    ? "pl-3.5 pr-10 h-11 sm:h-12 text-sm sm:text-base"
    : "px-3.5 h-11 sm:h-12 text-sm sm:text-base";

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-1.5 sm:space-y-2">
          {label && (
            <FormLabel htmlFor={name} className="text-sm font-medium text-gray-700">
              {label}
            </FormLabel>
          )}

          <FormControl>
            <div className="relative">
              <Input
                {...field}
                id={name}
                disabled={disabled}
                placeholder={placeholder}
                type={isPassword ? (showPassword ? "text" : "password") : type}
                className={inputPaddingClass}
              />

              {/* Password Toggle */}
              {isPassword && (
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              )}
            </div>
          </FormControl>

          <FormMessage className="text-xs sm:text-sm" />
        </FormItem>
      )}
    />
  );
};

export default PHInput;

