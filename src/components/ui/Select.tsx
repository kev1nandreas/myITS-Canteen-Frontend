/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { Select } from "radix-ui";
import classnames from "classnames";
import { Controller, Control } from "react-hook-form";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";

interface SelectProps {
  name: string;
  placeholder: string;
  datas: { label: string; value: string }[];
  control?: Control<any>;
  required?: boolean;
  onSelect?: (value: string) => void;
  classname?: string;
}

const SelectDropdown = ({
  name,
  placeholder,
  datas,
  control,
  required,
  onSelect,
  classname
}: SelectProps) => {
  if (control) {
    return (
      <Controller
        name={name}
        control={control}
        rules={{ required }}
        render={({ field }) => (
          <Select.Root
            value={field.value}
            onValueChange={(value) => {
              field.onChange(value);
              if (onSelect) onSelect(value);
            }}
          >
            <Select.Trigger
              className={`inline-flex h-[3rem] ${classname} items-center justify-between gap-[3rem] rounded-xl cursor-pointer bg-white px-[15px] border border-gray-200 leading-none outline-none hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-gray-300`}
              aria-label={placeholder}
            >
              <Select.Value placeholder={placeholder} />
              <Select.Icon className="text-violet11">
                <ChevronDownIcon />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content className={`${classname} relative left-5 top-0 rounded-md bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]`}>
                <Select.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-black/100">
                  <ChevronUpIcon />
                </Select.ScrollUpButton>
                <Select.Viewport className="p-[10px]">
                  <Select.Group>
                    {datas.map((data, index) => (
                      <SelectItem
                        key={index}
                        className="hover:bg-blue-100 cursor-pointer"
                        value={data.value}
                      >
                        {data.label}
                      </SelectItem>
                    ))}
                  </Select.Group>
                </Select.Viewport>
                <Select.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-violet11">
                  <ChevronDownIcon />
                </Select.ScrollDownButton>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        )}
      />
    );
  }

  // If no control, render as uncontrolled component
  return (
    <Select.Root onValueChange={onSelect} defaultValue="all">
      <Select.Trigger
        className="inline-flex h-[3rem] w-[22rem] items-center justify-between gap-[3rem] rounded-xl cursor-pointer bg-white px-[15px] border border-gray-200 leading-none outline-none hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-gray-300"
        aria-label={placeholder}
      >
        <Select.Value placeholder={placeholder} />
        <Select.Icon className="text-violet11">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="w-[22rem] relative left-5 top-0 rounded-md bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
          <Select.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-black/100">
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport className="p-[10px]">
            <Select.Group>
              {datas.map((data, index) => (
                <SelectItem
                  key={index}
                  className="hover:bg-blue-100 cursor-pointer"
                  value={data.value}
                >
                  {data.label}
                </SelectItem>
              ))}
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-violet11">
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

interface SelectItemProps
  extends React.ComponentPropsWithoutRef<typeof Select.Item> {
  children: React.ReactNode;
  className?: string;
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={classnames(
          "relative flex h-[2rem] select-none items-center rounded-[3px] pl-[25px] pr-[35px] leading-none text-black/100 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 data-[highlighted]:outline-none",
          className
        )}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);

SelectItem.displayName = "SelectItem";

export default SelectDropdown;
