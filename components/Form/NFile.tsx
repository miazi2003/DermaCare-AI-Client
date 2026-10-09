/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useState, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Camera } from "lucide-react";
import Image from "next/image";

type Props = {
  name: string;
  label?: string;
};

const NFile = ({ name, label }: Props) => {
  const { control } = useFormContext();
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("No File Chosen");

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        useEffect(() => {
          if (field.value) {
            if (Array.isArray(field.value) && field.value.length > 0) {
              const value = field.value[0];
              if (
                typeof value === "string" &&
                (value.startsWith("http://") || value.startsWith("https://"))
              ) {
                setPreview(value);
                setFileName("Default File");
              }
              else if (value instanceof File) {
                setPreview(URL.createObjectURL(value));
                setFileName(value.name);
              }
            }
            else if (
              typeof field.value === "string" &&
              (field.value.startsWith("http://") ||
                field.value.startsWith("https://"))
            ) {
              setPreview(field.value);
              setFileName("Default File");
            }
          } else {
            setPreview(null);
            setFileName("No File Chosen");
          }
        }, [field.value]);

        return (
          <div className="flex flex-col gap-2 mb-4 w-full">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div>
                {label && (
                  <label
                    htmlFor={name}
                    className="font-medium text-sm text-gray-700"
                  >
                    {label}
                  </label>
                )}
                <div
                  className="w-48 h-48 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:border-gray-400 transition"
                  onClick={() => document.getElementById(name)?.click()}
                >
                  {preview ? (
                    <Image
                      src={preview}
                      alt="preview"
                      width={300}
                      height={400}
                      className="h-48 w-48 object-cover rounded-full"
                      unoptimized={preview.startsWith("blob:")} // For blob URLs
                    />
                  ) : (
                    <Camera className="text-green-600 w-10 h-10" />
                  )}
                </div>
                <input
                  id={name}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    field.onChange(file ? [file] : []);
                    if (file) {
                      setFileName(file.name);
                      setPreview(URL.createObjectURL(file));
                    } else {
                      setFileName("No File Chosen");
                      setPreview(null);
                    }
                  }}
                />
              </div>

              <div>
                <h1 className="text-lg font-semibold text-[#F1F5F9]">
                  Upload your profile image
                </h1>
                <p className="text-xs text-gray-400 my-3">
                  Formats: JPG, PNG, JPEG – Max 5MB each
                </p>
                <div className="flex items-center justify-between border rounded-md px-3 py-1 text-sm">
                  <label
                    htmlFor={name}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md border cursor-pointer hover:bg-gray-200"
                  >
                    Choose File
                  </label>
                  <span className="text-gray-500 truncate max-w-[200px]">
                    {fileName}
                  </span>
                </div>
              </div>
            </div>
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

export default NFile;
