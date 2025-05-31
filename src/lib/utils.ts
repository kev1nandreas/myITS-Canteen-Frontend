/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ClassValue, clsx } from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import CryptoJS from "crypto-js";

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
