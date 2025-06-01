/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useQuery } from "@tanstack/react-query";
import { get } from "../main/call";
import { MAIN_ENDPOINT } from "../main/endpoint";

export const useFetchAllCanteen = (
  onSuccess?: () => void,
  onError?: () => void
) => {
  return useQuery({
    queryFn: async () => {
      const { Kind, OK } = await get(MAIN_ENDPOINT.Canteen.GetCanteens);
      if (!OK) {
        throw new Error(
          (Kind as { message: string }).message ||
            (Kind as { Message: string }).Message
        );
      }
      return Kind;
    },
    queryKey: ["fetch.canteen.all"],
  }) as any;
};

export const useFetchVendorbyCanteen = (
  canteenId: string,
  onSuccess?: () => void,
  onError?: () => void
) => {
  return useQuery({
    queryFn: async () => {
      const { Kind, OK } = await get(
        MAIN_ENDPOINT.Canteen.GetVendor.replace("$idCanteen", canteenId)
      );
      if (!OK) {
        throw new Error(
          (Kind as { message: string }).message ||
            (Kind as { Message: string }).Message
        );
      }
      return Kind;
    },
    queryKey: ["fetch.vendor.by.canteen", canteenId],
  }) as any;
};
