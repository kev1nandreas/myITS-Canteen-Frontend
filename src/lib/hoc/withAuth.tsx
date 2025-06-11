/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import { ComponentType } from "react";
import { useFetchProfile } from "@/services/api/hook/useAuth";
import Loading from "@/components/ui/LoadingUI";
import { typecastUserResponse, UserResponse } from "@/types/response";
import { PATH } from "@/shared/path";

interface AuthProps {
  redirectTo?: string;
  allowedRoles?: string[];
}

export function withAuth<P extends Record<string, any> = object>(
  Component: ComponentType<P & { user: UserResponse }>,
  authProps: AuthProps = {}
): ComponentType<P> {
  const WithAuthComponent = (props: P) => {
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
      router.push(authProps.redirectTo || PATH.AUTH.LOGIN);
      return null;
    }

    return <Component {...(props as P & { user: UserResponse })} user={userData} />;
  };

  WithAuthComponent.displayName = `withAuth(${Component.displayName || Component.name})`;

  return WithAuthComponent;
}