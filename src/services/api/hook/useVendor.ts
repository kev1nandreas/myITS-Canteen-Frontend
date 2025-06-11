/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { MAIN_ENDPOINT } from "../main/endpoint";
import { get } from "../main/call";

export const useFetchMenubyVendor = (
  vendorName: string,
  onSuccess?: () => void,
  onError?: () => void
) => {
  return useQuery({
    queryFn: async () => {
      const { Kind, OK } = await get(MAIN_ENDPOINT.Vendor.GetMenusByVendor, {
        v_name: vendorName,
      });
      if (!OK) {
        throw new Error(
          (Kind as { message: string }).message ||
            (Kind as { Message: string }).Message
        );
      }
      return Kind;
    },
    queryKey: ["fetch.menu.by.vendor", vendorName],
  }) as any;
};

export const useFetchVendorMenu = (
  onSuccess?: () => void,
  onError?: () => void
) => {
  return useQuery({
    queryFn: async () => {
      const { Kind, OK } = await get(MAIN_ENDPOINT.Menu.GetMenus);
      if (!OK) {
        throw new Error(
          (Kind as { message: string }).message ||
            (Kind as { Message: string }).Message
        );
      }
      return Kind;
    },
    queryKey: ["fetch.vendor.menu"],
  }) as any;
};

export const useFetchVendorDailies = (
  onSuccess?: () => void,
  onError?: () => void
) => {
  return useQuery({
    queryFn: async () => {
      const { Kind, OK } = await get(MAIN_ENDPOINT.Vendor.GetDailyReports);
      if (!OK) {
        throw new Error(
          (Kind as { message: string }).message ||
            (Kind as { Message: string }).Message
        );
      }
      return Kind;
    },
    queryKey: ["fetch.vendor.daily"],
    refetchInterval: 1000 * 60 * 3,
  }) as any;
};

export const useFetchVendorWeeklySales = (
  onSuccess?: () => void,
  onError?: () => void
) => {
  return useQuery({
    queryFn: async () => {
      const { Kind, OK } = await get(MAIN_ENDPOINT.Vendor.GetWeeklySales);
      if (!OK) {
        throw new Error(
          (Kind as { message: string }).message ||
            (Kind as { Message: string }).Message
        );
      }
      return Kind;
    },
    queryKey: ["fetch.vendor.weekly.sales"],
  }) as any;
};

export const useFetchVendorTopMenus = (
  onSuccess?: () => void,
  onError?: () => void
) => {
  return useQuery({
    queryFn: async () => {
      const { Kind, OK } = await get(MAIN_ENDPOINT.Vendor.GetTopMenus);
      if (!OK) {
        throw new Error(
          (Kind as { message: string }).message ||
            (Kind as { Message: string }).Message
        );
      }
      return Kind;
    },
    queryKey: ["fetch.vendor.top.menus"],
  }) as any;
};