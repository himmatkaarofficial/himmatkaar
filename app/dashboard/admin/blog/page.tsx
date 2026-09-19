"use client";

import AdminLayout from "@/components/AdminLayout";
import AdminBlogManager from "@/components/AdminBlogManager";

export default function AdminBlog() {
  return (
    <AdminLayout title="Blog Management">
      <AdminBlogManager />
    </AdminLayout>
  );
}



