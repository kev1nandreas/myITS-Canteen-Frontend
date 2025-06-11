/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { del, post } from "../main/call";
import { MAIN_ENDPOINT } from "../main/endpoint";

export const useCreateMenu = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: any) => void;
  onError: (error: any) => void;
}) => {
  return useMutation({
    mutationFn: async (body: FormData) => {
      const { Kind, OK } = await post(MAIN_ENDPOINT.Menu.CreateMenu, body);
      if (!OK) {
        throw new Error(
          (Kind as { message: string }).message ||
            (Kind as { Message: string }).Message
        );
      }
      return Kind;
    },
    mutationKey: ["create.menu"],
    onSuccess,
    onError,
  });
};

export const useEditMenu = ({
  idMenu,
  onSuccess,
  onError,
}: {
  idMenu: string;
  onSuccess: (data: any) => void;
  onError: (error: any) => void;
}) => {
  return useMutation({
    mutationFn: async (body: FormData) => {
      const { Kind, OK } = await post(
        MAIN_ENDPOINT.Menu.EditMenu.replace("$idMenu", idMenu),
        body
      );
      if (!OK) {
        throw new Error(
          (Kind as { message: string }).message ||
            (Kind as { Message: string }).Message
        );
      }
      return Kind;
    },
    mutationKey: ["edit.menu", idMenu],
    onSuccess,
    onError,
  });
};

export const useDeleteMenu = ({
  idMenu,
  onSuccess,
  onError,
}: {
  idMenu: string;
  onSuccess: (data: any) => void;
  onError: (error: any) => void;
}) => {
  return useMutation({
    mutationFn: async () => {
      const { Kind, OK } = await del(
        MAIN_ENDPOINT.Menu.DeleteMenu.replace("$idMenu", idMenu)
      );
      if (!OK) {
        throw new Error(
          (Kind as { message: string }).message ||
            (Kind as { Message: string }).Message
        );
      }
      return Kind;
    },
    mutationKey: ["delete.menu"],
    onSuccess,
    onError,
  });
};
