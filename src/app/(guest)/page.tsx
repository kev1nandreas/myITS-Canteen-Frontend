"use client";

import Header from "@/components/Header";
import Sidebar from "@/containers/Sidebar";
import ProtectedRoute from "@/modules/providers/protected_provider";

export default function Page() {
  return (
    <>
      <ProtectedRoute allowRoles={["user"]}>
        <Header />
        <Sidebar />
      </ProtectedRoute>
    </>
  );
}
