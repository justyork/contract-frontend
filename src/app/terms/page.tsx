import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-14 max-w-4xl items-center px-4">
          <Link href="/" className="text-slate-600 hover:text-slate-900">
            ← Contralytic
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-bold text-slate-900">Terms of Service</h1>
        <p className="mt-2 text-slate-500">Last updated: February 2026</p>

        <div className="mt-10 space-y-8 text-slate-700">
          <section>
            <h2 className="text-xl font-semibold text-slate-800">1. Service</h2>
            <p className="mt-2">
              Contralytic provides AI-powered contract analysis. We offer the service on a
              pay-per-use basis (token packages). By using the service you agree to these terms.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-slate-800">2. Limitation of liability</h2>
            <p className="mt-2">
              The analysis is provided for informational purposes only. It does not constitute
              legal, financial, or professional advice. You should consult a qualified professional
              for decisions based on contract terms. We are not liable for any reliance on the
              analysis or for outcomes of your negotiations or agreements.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-slate-800">3. Tokens</h2>
            <p className="mt-2">
              Tokens are consumed when you run an analysis. One token corresponds to 1,000
              characters of contract text (as defined in our documentation). Purchased tokens
              do not expire. We do not refund unused tokens except as required by law.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-slate-800">4. Refunds</h2>
            <p className="mt-2">
              Refund requests for token purchases are handled on a case-by-case basis. If the
              service fails to deliver analysis after token deduction, we will credit the
              tokens back. Contact support with your transaction details.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-slate-800">5. Intellectual property</h2>
            <p className="mt-2">
              You retain ownership of the content you submit. You grant us a limited license
              to process it for providing the service. Our platform, branding, and materials
              remain our property.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-slate-800">6. Contact</h2>
            <p className="mt-2">
              For terms-related questions: legal@contralytic.example.com (replace with your
              contact email).
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
