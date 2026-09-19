"use client";

import AdminLayout from "@/components/AdminLayout";
import AdminAmbassadorsManager from "@/components/AdminAmbassadorsManager";

export default function AdminAmbassadors() {
  return (
    <AdminLayout title="Ambassador Management">
      <AdminAmbassadorsManager />
    </AdminLayout>
  );
}



