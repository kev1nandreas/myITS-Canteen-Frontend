/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useMutation, useQuery } from "@tanstack/react-query";
import { MAIN_ENDPOINT } from "../main/endpoint";
import { get, post } from "../main/call";

export const useFetchTransaction = (
  onSuccess?: () => void,
  onError?: () => void
) => {
  return useQuery({
    queryFn: async () => {
      const { Kind, OK } = await get(
        MAIN_ENDPOINT.Transaction.GetTransactionHistory
      );
      if (!OK) {
        throw new Error(
          (Kind as { message: string }).message ||
            (Kind as { Message: string }).Message
        );
      }
      return Kind;
    },
    queryKey: ["fetch.transaction.user"],
  }) as any;
};

export const useFetchVendorTransaction = (
  onSuccess?: () => void,
  onError?: () => void
) => {
  return useQuery({
    queryFn: async () => {
      const { Kind, OK } = await get(
        MAIN_ENDPOINT.Transaction.GetVendorTransactionHistory
      );
      if (!OK) {
        throw new Error(
          (Kind as { message: string }).message ||
            (Kind as { Message: string }).Message
        );
      }
      return Kind;
    },
    queryKey: ["fetch.transaction.vendor"],
  }) as any;
};

export const useAcceptTransaction = ({
  idTransaction,
  onSuccess,
  onError,
}: {
  idTransaction: string;
  onSuccess: (data: any) => void;
  onError: (error: any) => void;
}) => {
  return useMutation({
    mutationFn: async () => {
      const { Kind, OK } = await post(
        MAIN_ENDPOINT.Transaction.AcceptTransaction.replace(
          "$idTransaction",
          idTransaction
        )
      );
      if (!OK) {
        throw new Error(
          (Kind as { message: string }).message ||
            (Kind as { Message: string }).Message
        );
      }
      return Kind;
    },
    mutationKey: ["accept.transaction"],
    onSuccess,
    onError,
  }) as any;
};

export const useRejectTransaction = ({
  idTransaction,
  onSuccess,
  onError,
}: {
  idTransaction: string;
  onSuccess: (data: any) => void;
  onError: (error: any) => void;
}) => {
  return useMutation({
    mutationFn: async () => {
      const { Kind, OK } = await post(
        MAIN_ENDPOINT.Transaction.RejectTransaction.replace(
          "$idTransaction",
          idTransaction
        )
      );
      if (!OK) {
        throw new Error(
          (Kind as { message: string }).message ||
            (Kind as { Message: string }).Message
        );
      }
      return Kind;
    },
    mutationKey: ["accept.transaction"],
    onSuccess,
    onError,
  }) as any;
};
