"use client"

import { withAuth } from "@/lib/hoc/withAuth";
import { PATH } from "@/shared/path";
import { UserResponse } from "@/types/response";

interface DashboardProps {
  user: UserResponse;
}

function Dashboard({ user }: DashboardProps) {
  return (
    <div className="flex items-center justify-center h-full md:w-[80%] w-full p-4">
      <h1 className="text-2xl font-bold">Welcome {user.name}</h1>
    </div>
  );
}

export default withAuth(Dashboard, {
  redirectTo: PATH.AUTH.LOGIN,
  allowedRoles: ["admin"],
});
