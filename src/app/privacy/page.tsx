import Link from "next/link";

export default function PrivacyPage() {
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
        <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>
        <p className="mt-2 text-slate-500">Last updated: February 2026</p>

        <div className="mt-10 space-y-8 text-slate-700">
          <section>
            <h2 className="text-xl font-semibold text-slate-800">1. Data we collect</h2>
            <p className="mt-2">
              We collect your name, email address, and account credentials when you register.
              When you use our contract analysis service, we process the contract text you submit.
              We do not use your contract content for training AI models.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-slate-800">2. How we use data</h2>
            <p className="mt-2">
              Your data is used to provide the service: account management, contract analysis via
              our AI provider (OpenAI), and payment processing (Stripe). Analysis is performed
              according to our Terms of Service.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-slate-800">3. Storage and security</h2>
            <p className="mt-2">
              Data is stored using industry-standard encryption. We retain contract analyses
              associated with your account as described in our Terms. We do not sell your
              personal data or contract content to third parties.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-slate-800">4. Your rights (GDPR)</h2>
            <p className="mt-2">
              You may request access to, correction of, or deletion of your personal data.
              You may object to processing or request data portability. To exercise these
              rights, contact us at the email below. You also have the right to lodge a
              complaint with a supervisory authority.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-slate-800">5. Cookies</h2>
            <p className="mt-2">
              We use necessary cookies for authentication and session management. Optional
              analytics cookies may be used with your consent. See our cookie banner and
              settings for more information.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-slate-800">6. Contact</h2>
            <p className="mt-2">
              For privacy-related questions, contact: privacy@contralytic.example.com
              (replace with your contact email).
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
