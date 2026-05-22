import Link from "next/link";
import { ArrowRight, Sparkles, BookOpen, Zap, Shield } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-white to-slate-50">

      {/* ── Top Navigation ── */}
      <header className="w-full px-6 py-5 flex items-center justify-between border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-indigo-600" />
          <span className="text-lg font-bold tracking-tight text-slate-900">
            Veda AI
          </span>
        </div>
        <Link
          href="/assignments"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          Dashboard →
        </Link>
      </header>

      {/* ── Hero ── */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-24">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 border border-indigo-100 px-4 py-1.5 mb-8">
          <Zap className="h-3.5 w-3.5 text-indigo-500" />
          <span className="text-xs font-semibold text-indigo-600 uppercase tracking-widest">
            AI-Powered Assessment
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight max-w-3xl">
          Welcome to{" "}
          <span className="text-indigo-600">Veda AI</span>
        </h1>

        {/* Sub-headline */}
        <p className="mt-4 text-xl md:text-2xl font-medium text-slate-500">
          The Intelligent AI Assessment Creator
        </p>

        {/* Description */}
        <p className="mt-6 text-base md:text-lg text-slate-600 max-w-2xl leading-relaxed">
          Automate your exam generation. Upload your syllabus, set your
          constraints, and let AI build structured, high-quality question
          papers in seconds.
        </p>

        {/* CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/assignments"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-7 py-3.5 text-base font-semibold text-white shadow-md hover:bg-indigo-700 hover:opacity-90 transition-all duration-200"
          >
            Go to Dashboard
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Feature pills */}
        <div className="mt-16 flex flex-wrap justify-center gap-4 text-sm text-slate-500">
          {[
            { icon: BookOpen, label: "Syllabus Upload" },
            { icon: Zap,      label: "Instant Generation" },
            { icon: Shield,   label: "Structured Output" },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm"
            >
              <Icon className="h-4 w-4 text-indigo-500" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-6 text-center text-xs text-slate-400 border-t border-slate-100">
        © {new Date().getFullYear()} Veda AI. All rights reserved.
      </footer>
    </main>
  );
}