"use client";

import AdminLayout from "@/components/AdminLayout";
import AdminPartnerManager from "@/components/AdminPartnerManager";

export default function AdminPartnersPage() {
  return (
    <AdminLayout title="Partners">
      <AdminPartnerManager />
    </AdminLayout>
  );
}
