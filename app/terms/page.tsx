import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-32 pb-24">
        <section className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-[#39894c] hover:underline mb-8 font-semibold">
            <ArrowLeft size={20} /> Back to Home
          </Link>

          <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">Terms of Use</h1>
          <p className="text-slate-600 mb-10">Effective date: March 30, 2026</p>

          <div className="space-y-8 text-slate-700 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing or using this platform, you agree to these Terms of Use. If you do not agree, please
                discontinue use of the website and related services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">2. Use of Services</h2>
              <p>
                You agree to use our platform lawfully and respectfully. You must not misuse forms, submit false
                information, attempt unauthorized access, or disrupt platform operations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">3. Intellectual Property</h2>
              <p>
                Content, branding, and materials on this platform are owned by Himmatkaar or its licensors and are
                protected by applicable laws. You may not reproduce or redistribute content without permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">4. Third-Party Links</h2>
              <p>
                Our platform may include links to third-party websites. We are not responsible for the content,
                policies, or practices of those external services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">5. Limitation of Liability</h2>
              <p>
                Services are provided on an "as available" basis. To the extent permitted by law, Himmatkaar is not
                liable for indirect, incidental, or consequential damages arising from platform use.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">6. Updates to Terms</h2>
              <p>
                We may update these terms from time to time. Updated terms become effective when posted on this page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">7. Contact</h2>
              <p>
                For questions regarding these terms, please contact us.
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



