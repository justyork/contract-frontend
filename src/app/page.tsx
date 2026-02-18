import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <span className="text-xl font-semibold text-slate-800">
            Contralytic
          </span>
          <nav className="flex items-center gap-6">
            <Link
              href="/#features"
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              Features
            </Link>
            <Link
              href="/#pricing"
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              Pricing
            </Link>
            <Link
              href="/#faq"
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              FAQ
            </Link>
            <Link
              href="/login"
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="rounded-full bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
            >
              Get started
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="px-4 py-24 text-center">
          <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Understand your contract before you sign
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            AI-powered analysis: key points, risks, hidden clauses, and a clear
            recommendation. In minutes, not hours.
          </p>
          <div className="mt-10">
            <Link
              href="/register"
              className="inline-flex rounded-full bg-slate-800 px-8 py-3 text-base font-medium text-white hover:bg-slate-700"
            >
              Start analyzing
            </Link>
          </div>
        </section>

        <section id="features" className="border-t border-slate-200 bg-white px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center text-2xl font-bold text-slate-900">
              Why Contralytic
            </h2>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Speed",
                  desc: "Analysis in minutes instead of hours of reading.",
                },
                {
                  title: "Clarity",
                  desc: "Structured report with risks, suggestions, and a 1–10 signing score.",
                },
                {
                  title: "Pay per use",
                  desc: "Buy tokens as you need; they don’t expire.",
                },
                {
                  title: "Security",
                  desc: "Documents processed with encryption; see our Privacy Policy.",
                },
              ].map((f) => (
                <div
                  key={f.title}
                  className="rounded-xl border border-slate-200 bg-slate-50/50 p-6"
                >
                  <h3 className="font-semibold text-slate-800">{f.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center text-2xl font-bold text-slate-900">
              How it works
            </h2>
            <ol className="mt-12 flex flex-col gap-8 sm:flex-row sm:justify-between">
              {[
                "Register and buy tokens",
                "Paste text or upload a PDF contract",
                "Get a structured analysis and recommendation",
              ].map((step, i) => (
                <li
                  key={step}
                  className="flex flex-1 items-start gap-4 rounded-xl border border-slate-200 bg-white p-6"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-800 text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="text-slate-700">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="pricing" className="border-t border-slate-200 bg-white px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center text-2xl font-bold text-slate-900">
              Pricing
            </h2>
            <p className="mt-2 text-center text-slate-600">
              One token ≈ 1,000 characters. Average contract (~20K chars) ≈ €2. Buy once, use when you need.
            </p>
            <div className="mt-12 grid gap-6 sm:grid-cols-4">
              {[
                { name: "Starter", tokens: 20, price: "€2", desc: "1 analysis" },
                { name: "Pro", tokens: 50, price: "€4.50", desc: "2-3 analyses", save: "€0.50" },
                { name: "Business", tokens: 100, price: "€8", desc: "5 analyses", save: "€2" },
                { name: "Enterprise", tokens: 200, price: "€15", desc: "10 analyses", save: "€5" },
              ].map((p) => (
                <div
                  key={p.name}
                  className="rounded-xl border border-slate-200 bg-slate-50/50 p-6"
                >
                  <h3 className="font-semibold text-slate-800">{p.name}</h3>
                  <p className="mt-1 text-sm text-slate-600">{p.desc}</p>
                  <p className="mt-4 text-2xl font-bold text-slate-900">
                    {p.price}
                    {p.save && (
                      <span className="ml-2 text-sm font-normal text-green-600">
                        save {p.save}
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-slate-600">{p.tokens} tokens</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="px-4 py-20">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-center text-2xl font-bold text-slate-900">
              FAQ
            </h2>
            <dl className="mt-12 space-y-6">
              {[
                {
                  q: "What is Contralytic?",
                  a: "Contralytic is an AI-powered platform for contract analysis: insights, risks, key terms, and suggestions.",
                },
                {
                  q: "How do tokens work?",
                  a: "One token ≈ 1,000 characters of contract text. Average contract (~20K chars) ≈ €2. Packages (e.g. 20 / 50 / 100 / 200 tokens) are one-time purchases; tokens do not expire.",
                },
                {
                  q: "Is there a free trial?",
                  a: "The service is pay-per-use; you need to buy tokens to analyze contracts. No free tokens on sign-up.",
                },
                {
                  q: "Is my contract data safe?",
                  a: "We use encryption and do not store or share contract content beyond what’s needed for analysis. See our Privacy Policy.",
                },
                {
                  q: "What languages are supported?",
                  a: "You can request analysis in a specific language (e.g. ru, en); otherwise the model follows the contract language.",
                },
                {
                  q: "How accurate is the AI?",
                  a: "Analysis is powered by GPT-4o. Use it as an aid, not as your only source of legal advice.",
                },
              ].map((faq) => (
                <div key={faq.q} className="rounded-lg border border-slate-200 bg-white p-4">
                  <dt className="font-medium text-slate-800">{faq.q}</dt>
                  <dd className="mt-2 text-sm text-slate-600">{faq.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white px-4 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <span className="text-sm text-slate-500">Contralytic</span>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-sm text-slate-500 hover:text-slate-700">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-slate-500 hover:text-slate-700">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
