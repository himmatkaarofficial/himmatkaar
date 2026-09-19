import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-32 pb-24">
        <section className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-[#39894c] hover:underline mb-8 font-semibold">
            <ArrowLeft size={20} /> Back to Home
          </Link>

          <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">Cookie Policy</h1>
          <p className="text-slate-600 mb-10">Effective date: March 30, 2026</p>

          <div className="space-y-8 text-slate-700 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">1. What Are Cookies</h2>
              <p>
                Cookies are small text files stored on your device to help websites function, remember preferences,
                and improve user experience.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">2. How We Use Cookies</h2>
              <p>
                We may use essential cookies for site functionality and optional cookies for analytics or performance
                improvements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">3. Managing Cookies</h2>
              <p>
                You can control or delete cookies through your browser settings. Disabling some cookies may affect site
                functionality.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">4. Contact</h2>
              <p>
                If you have questions about our cookie use, please contact us.
              </p>
              <p className="mt-3">
                <Link href="/contact" className="text-[#39894c] font-semibold hover:underline">Go to Contact Page</Link>
              </p>
            </section>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}


