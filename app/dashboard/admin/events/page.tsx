"use client";

import AdminLayout from "@/components/AdminLayout";
import AdminEventsManager from "@/components/AdminEventsManager";

export default function AdminEvents() {
  return (
    <AdminLayout title="Event Management">
      <AdminEventsManager />
    </AdminLayout>
  );
}



