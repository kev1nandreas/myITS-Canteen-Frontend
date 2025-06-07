/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { MAIN_ENDPOINT } from "../main/endpoint";
import { get } from "../main/call";

export const useFetchMenubyVendor = (
  vendorId: string,
  onSuccess?: () => void,
  onError?: () => void
) => {
  return useQuery({
    queryFn: async () => {
      const { Kind, OK } = await get(
        MAIN_ENDPOINT.Vendor.GetMenus.replace("$idVendor", vendorId)
      );
      if (!OK) {
        throw new Error(
          (Kind as { message: string }).message ||
            (Kind as { Message: string }).Message
        );
      }
      return Kind;
    },
    queryKey: ["fetch.menu.by.vendor", vendorId],
  }) as any;
};
