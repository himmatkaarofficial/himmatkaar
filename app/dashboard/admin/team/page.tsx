"use client";

import AdminLayout from "@/components/AdminLayout";
import AdminTeamManager from "@/components/AdminTeamManager";

export default function AdminTeam() {
  return (
    <AdminLayout title="Team Management">
      <AdminTeamManager />
    </AdminLayout>
  );
}



