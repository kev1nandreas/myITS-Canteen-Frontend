/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { Controller, Control } from "react-hook-form";

interface RadioButtonProps {
  data: { label: string; value: string }[];
  defaultValue?: string;
  name: string;
  control: Control<any>;
  required?: boolean;
  onSelect?: (value: string) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  data,
  defaultValue,
  name,
  control,
  required,
  onSelect,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={{ required: required }}
      render={({ field, fieldState: { error } }) => (
        <>
          <RadioGroup.Root
            className="flex gap-7"
            aria-label="Radio Group"
            value={field.value}
            onValueChange={(value) => {
              field.onChange(value);
              if (onSelect) onSelect(value);
            }}
          >
            {data.map((item, index) => (
              <div className="flex items-center" key={item.value}>
                <RadioGroup.Item
                  className="size-[25px] cursor-pointer rounded-full bg-white border-[1px] outline-none hover:bg-blue-200 data-[state=checked]:bg-blue-100"
                  value={item.value}
                  id={`${name + index}`}
                >
                  <RadioGroup.Indicator className="relative flex size-full items-center justify-center after:block after:size-[11px] after:rounded-full after:bg-blue-600" />
                </RadioGroup.Item>
                <label
                  className="pl-[15px] leading-none"
                  htmlFor={`${name + index}`}
                >
                  {item.label}
                </label>
              </div>
            ))}
          </RadioGroup.Root>
          {error && (
            <span className="text-red-500 text-sm">Bagian ini wajib diisi</span>
          )}
        </>
      )}
    />
  );
};

export default RadioButton;
