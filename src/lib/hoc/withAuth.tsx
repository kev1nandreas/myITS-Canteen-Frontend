"use client";

import { useRouter } from "next/navigation";
import { ComponentType, useEffect, useState } from "react";
import { decrypt } from "../utils";
import Loading from "@/components/ui/LoadingUI";

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
    const [role, setRole] = useState<string | null>(null);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
      const encryptedRole = window.localStorage.getItem("roles");
      const decryptedRole = encryptedRole ? decrypt(encryptedRole) : null;

      setRole(decryptedRole);
      if (
        authProps.allowedRoles &&
        !authProps.allowedRoles.includes(decryptedRole || "")
      ) {
        router.replace(authProps.redirectTo || "/login");
      }
      setIsChecking(false);
    }, [router]);

    if (isChecking) {
      return <Loading />;
    }

    if (
      role &&
      (!authProps.allowedRoles || authProps.allowedRoles.includes(role))
    ) {
      return <Component {...props} />;
    }

    return null;
  };
}