/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { MAIN_ENDPOINT } from "../main/endpoint";
import { post } from "../main/call";
import { typecastLoginResponse } from "@/types/response";
import { createCookies, removeCookies } from "@/modules/cookies";
import { ENV } from "@/configs/environment";
import { encrypt } from "@/lib/utils";

export const useLogin = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: any) => void;
  onError: (error: any) => void;
}) => {
  return useMutation({
    mutationFn: async (body: FormData) => {
      const { Kind, OK } = await post(MAIN_ENDPOINT.Auth.Login, body);
      if (!OK) {
        throw new Error(
          (Kind as { message: string }).message ||
            (Kind as { Message: string }).Message
        );
      }
      const resp = typecastLoginResponse((Kind as { data: any })?.data);
      await createCookies({
        name: ENV.TOKEN_KEY,
        data: resp?.token as string,
      });
      localStorage.setItem("roles", encrypt(resp?.user.role as string));
      localStorage.setItem("name", encrypt(resp?.user.name as string));
      return Kind;
    },
    mutationKey: ["login"],
    onSuccess,
    onError,
  });
};

export const useRegister = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: any) => void;
  onError: (error: any) => void;
}) => {
  return useMutation({
    mutationFn: async (body: FormData) => {
      const { Kind, OK } = await post(MAIN_ENDPOINT.Auth.Register, body);
      if (!OK) {
        throw new Error(
          (Kind as { message: string }).message ||
            (Kind as { Message: string }).Message
        );
      }
      return Kind;
    },
    mutationKey: ["register"],
    onSuccess,
    onError,
  });
};

export const useLogout = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: any) => void;
  onError: (error: any) => void;
}) => {
  return useMutation({
    mutationFn: async () => {
      const { Kind, OK } = await post(MAIN_ENDPOINT.Auth.Logout);
      if (!OK) {
        throw new Error(
          (Kind as { message: string }).message ||
            (Kind as { Message: string }).Message
        );
      }
      await removeCookies(ENV.TOKEN_KEY);
      localStorage.removeItem("roles");
      localStorage.removeItem("name");
      return Kind;
    },
    mutationKey: ["logout"],
    onSuccess,
    onError,
  });
};
