/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { MAIN_ENDPOINT } from "../main/endpoint";
import { post } from "../main/call";

export const useCheckout = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: any) => void;
  onError: (error: any) => void;
}) => {
  return useMutation({
    mutationFn: async (body: FormData) => {
      const { Kind, OK } = await post(MAIN_ENDPOINT.Transaction.CreateTransaction, body);
      if (!OK) {
        throw new Error(
          (Kind as { message: string }).message ||
            (Kind as { Message: string }).Message
        );
      }
      return Kind;
    },
    mutationKey: ["transaction"],
    onSuccess,
    onError,
  });
};