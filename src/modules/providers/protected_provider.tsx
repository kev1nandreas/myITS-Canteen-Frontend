"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { decrypt } from "@/lib/utils";

type Props = {
  children: ReactNode;
  allowRoles: string[];
};

export default function ProtectedRoute({ children, allowRoles }: Props) {
  const router = useRouter();
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    const encryptedRole = window.localStorage.getItem("roles");
    const role = encryptedRole ? decrypt(encryptedRole) : "";
    setRole(role);

    if (!allowRoles.includes(role)) {
      router.push("/unauthorized");
    }
  }, [role]);

  return <>{allowRoles.includes(role) && children}</>;
}
