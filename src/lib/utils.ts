/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ClassValue, clsx } from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import CryptoJS from "crypto-js";
import { topMenuResponse, weeklySalesResponse } from "@/types/response";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseFormData(data: any) {
  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }
  return formData;
}

export const useGetMe = () => {
  const role = useSelector((state: any) => state.authorized.Role);
  const name = useSelector((state: any) => state.authorized.Name);
  return { role, name };
};

export const useSetMe = () => {
  const dispatch = useDispatch();
  return {
    setMe: (role: string, name: string) => {
      dispatch({
        type: "authorized/changeAuthorized",
        payload: { Role: role, Name: name },
      });
    },
  };
};

export const useGetSidebar = () => {
  const isOpen = useSelector((state: any) => state.sidebar.isOpen);
  return { isOpen };
};

export const useSetSidebar = () => {
  const dispatch = useDispatch();
  return {
    setSidebar: (isOpen: boolean) => {
      dispatch({
        type: "sidebar/setSidebarState",
        payload: isOpen,
      });
    },
  };
};

export const encrypt = (text: string): string => {
  return CryptoJS.AES.encrypt(
    text,
    process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "default_key"
  ).toString();
};

export const decrypt = (ciphertext: string): string => {
  const bytes = CryptoJS.AES.decrypt(
    ciphertext,
    process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "default_key"
  );
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(price)
    .replace("IDR", "Rp");
};

export const formatWeeklyEarnings = (
  earnings: weeklySalesResponse | undefined
): any => {
  const dates: string[] = [];
  const totalEarnings: number[] = [];

  if (earnings && earnings.sales_per_day) {
    for (const earning in earnings.sales_per_day) {
      dates.push(earnings.sales_per_day[earning].date);
      totalEarnings.push(earnings.sales_per_day[earning].daily_total);
    }
  }
  return { dates, totalEarnings };
};

export const formatTopMenu = (topMenu: topMenuResponse | undefined): any => {
  const labels: string[] = [];
  const data: number[] = [];
  let totalMenusSold = 0;

  if (topMenu && topMenu.top_menus) {
    for (const menu in topMenu.top_menus) {
      labels.push(topMenu.top_menus[menu].menu_name);
      data.push(topMenu.top_menus[menu].total_sold);

      totalMenusSold += topMenu.top_menus[menu].total_sold;
    }

    const others = topMenu.total_menus_sold_last_week - totalMenusSold;

    if (others > 0) {
      labels.push("Lainnya");
      data.push(others);
    }
  }

  return { labels, data };
};
