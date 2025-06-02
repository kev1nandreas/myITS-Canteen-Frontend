/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { Checkbox as RadixCheckbox } from "radix-ui";
import { CheckIcon } from "@radix-ui/react-icons";
import { Controller } from "react-hook-form";

interface CheckboxProps {
  name: string;
  control: any;
  options: { label: string; value: string }[];
  defaultValue?: string[];
  required?: boolean;
}

const CheckBox = ({
  name,
  control,
  options,
  defaultValue = [],
  required = false,
}: CheckboxProps) => (
  <Controller
    name={name}
    control={control}
    defaultValue={defaultValue}
    rules={{ required }}
    render={({ field: { value = [], onChange } }) => (
      <div className="flex flex-wrap w-full gap-4">
        {options.map((option, index) => (
          <div key={index} className="flex items-center">
            <RadixCheckbox.Root
              checked={value.includes(option.value)}
              onCheckedChange={(checked) => {
                const newValue = checked
                  ? [...value, option.value]
                  : value.filter((v: string) => v !== option.value);
                onChange(newValue);
              }}
              className="flex size-[25px] appearance-none items-center justify-center rounded bg-white outline-none border border-slate-300 hover:bg-slate-100"
              id={`checkbox-${option.value}`}
            >
              <RadixCheckbox.Indicator className="text-violet11">
                <CheckIcon />
              </RadixCheckbox.Indicator>
            </RadixCheckbox.Root>
            <label
              className="pl-[8px] text-[15px] leading-none text-black"
              htmlFor={`checkbox-${option.value}`}
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    )}
  />
);

export default CheckBox;
