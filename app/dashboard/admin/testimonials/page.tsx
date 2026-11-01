"use client";

import AdminLayout from "@/components/AdminLayout";
import AdminTestimonialManager from "@/components/AdminTestimonialManager";

export default function AdminTestimonialsPage() {
  return (
    <AdminLayout title="Member Testimonials">
      <AdminTestimonialManager />
    </AdminLayout>
  );
}
