"use client";

import AdminLayout from "@/components/AdminLayout";
import AdminLaunchpadManager from "@/components/AdminLaunchpadManager";

export default function AdminLaunchpad() {
  return (
    <AdminLayout title="Launchpad Sessions">
      <AdminLaunchpadManager />
    </AdminLayout>
  );
}
