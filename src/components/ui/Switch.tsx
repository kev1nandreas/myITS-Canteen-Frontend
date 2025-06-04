/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import * as RadixSwitch from "@radix-ui/react-switch";
import { Control, Controller } from "react-hook-form";

interface SwitchProps {
  id: string;
  name: string;
  label: string;
  control: Control<any>;
  defaultValue?: boolean;
  valueChange?: (value: boolean) => void;
}

const Switch = ({
  id,
  name,
  label,
  control,
  defaultValue = false,
  valueChange,
}: SwitchProps) => (
  <Controller
    name={name}
    control={control}
    defaultValue={defaultValue}
    render={({ field: { value, onChange } }) => (
      <div className="flex items-center gap-4">
        <RadixSwitch.Root
          checked={value}
          onCheckedChange={(checked) => {
            onChange(checked);
            if (valueChange) valueChange(checked);
          }}
          className="relative h-[25px] w-[42px] cursor-default rounded-full bg-gray-400 outline-none data-[state=checked]:bg-green-500"
          id={id}
        >
          <RadixSwitch.Thumb className="block size-[21px] translate-x-0.5 rounded-full bg-white transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]" />
        </RadixSwitch.Root>
        <label className="text-[15px] leading-none" htmlFor={id}>
          {label}
        </label>
      </div>
    )}
  />
);

export default Switch;
