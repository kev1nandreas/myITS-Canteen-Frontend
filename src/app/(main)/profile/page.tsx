"use client";

import { withAuth } from "@/lib/hoc/withAuth";
import { PATH } from "@/shared/path";
import { UserResponse } from "@/types/response";
import { FaRegUser } from "react-icons/fa";

interface ProfileProps {
  user: UserResponse;
}

function Profile({ user }: ProfileProps) {
  return (
    <div className="flex flex-col w-full md:w-[80%] h-[calc(100vh-4rem)] p-[2rem] overflow-y-auto">
      <h1 className="text-3xl font-bold">Profil</h1>
      {/* Header */}
      <div className="flex gap-6 mt-4 items-center bg-white p-4 rounded-lg border border-gray-200 max-w-[40rem]">
        <div className="p-3 w-[5rem] h-[5rem] flex justify-center items-center rounded-full bg-gradient-to-br from-blue-600 to-blue-300 text-white">
          <FaRegUser className="text-3xl" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>
      {/* Data */}
      <div className="flex flex-col mt-6 max-w-[40rem] bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex justify-between items-center p-4">
          <p className="font-semibold">Nama</p>
          <p className="opacity-70">{user.name}</p>
        </div>
        <div className="flex justify-between items-center border-t border-gray-200 p-4">
          <p className="font-semibold">Email</p>
          <p className="opacity-70">{user.email}</p>
        </div>
        <div className="flex justify-between items-center border-t border-gray-200 p-4">
          <p className="font-semibold">Poin</p>
          <p className="opacity-70">{user.point}</p>
        </div>
        <div className="flex justify-between items-center border-t border-gray-200 p-4">
          <p className="font-semibold">Akses</p>
          <p className="opacity-70">{user.role}</p>
        </div>
      </div>
    </div>
  );
}

export default withAuth(Profile, {
  redirectTo: PATH.AUTH.LOGIN,
  allowedRoles: ["user", "admin"],
});
