"use client";

import AdminLayout from "@/components/AdminLayout";
import AdminMentorsManager from "@/components/AdminMentorsManager";

export default function AdminMentors() {
  return (
    <AdminLayout title="Mentors & Facilitators">
      <AdminMentorsManager />
    </AdminLayout>
  );
}
