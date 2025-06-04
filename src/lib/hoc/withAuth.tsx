"use client";

import { useRouter } from "next/navigation";
import { ComponentType } from "react";
import { useFetchProfile } from "@/services/api/hook/useAuth";
import Loading from "@/components/ui/LoadingUI";
import { typecastUserResponse } from "@/types/response";
import { PATH } from "@/shared/path";

interface AuthProps {
  redirectTo?: string;
  allowedRoles?: string[];
}

export function withAuth<P extends object>(
  Component: ComponentType<P>,
  authProps: AuthProps = {}
) {
  return function WithAuth(props: P) {
    const router = useRouter();

    const { data, isLoading } = useFetchProfile();
    const userData = typecastUserResponse(data?.data);

    if (isLoading) {
      return <Loading />;
    }

    if (!userData) {
      router.push(PATH.AUTH.LOGIN);
      return null;
    }

    if (
      authProps.allowedRoles &&
      !authProps.allowedRoles.includes(userData.role)
    ) {
      router.push(PATH.NOT_FOUND);
      return null;
    }

    return <Component {...props} user={userData} />;
  };
}
