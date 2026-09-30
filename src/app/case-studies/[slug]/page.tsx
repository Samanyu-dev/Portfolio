import { notFound } from "next/navigation";
import Link from "next/link";
import { caseStudies } from "@/data/case-studies";
import TrackView from "@/components/portfolio-v3/TrackView";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const c = caseStudies.find((x) => x.slug === params.slug);
  return c ? { title: c.title, description: `${c.result}. ${c.summary}` } : {};
}

export default function CaseStudy({ params }: { params: { slug: string } }) {
  const c = caseStudies.find((x) => x.slug === params.slug);
  if (!c) notFound();
  return (
    <main className="min-h-screen bg-[#0b080c] px-6 py-24 text-white">
      <TrackView type="case_study_view" id={c.slug} />
      <div className="mx-auto max-w-3xl">
        <Link href="/#hackathons" className="text-sm text-white/60 hover:text-white">← Back</Link>
        <p className="mt-8 text-sm uppercase tracking-widest text-[var(--primary)]">{c.result}</p>
        <h1 className="mt-2 text-4xl font-semibold leading-tight">{c.title}</h1>
        <p className="mt-4 text-lg text-white/70">{c.summary}</p>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {c.stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-xs text-white/60">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex gap-3 text-sm">
          <a className="rounded-full bg-white px-4 py-1.5 font-semibold text-black" href={c.repo} target="_blank" rel="noopener noreferrer">GitHub</a>
          {c.link && <a className="rounded-full border border-white/30 px-4 py-1.5" href={c.link.href} target="_blank" rel="noopener noreferrer">{c.link.label}</a>}
        </div>
        {c.timeline && (
          <section className="mt-12">
            <h2 className="mb-4 text-2xl font-medium">Score timeline</h2>
            <ol className="space-y-3 border-l border-white/15 pl-5">
              {c.timeline.map((t) => (
                <li key={t.when}>
                  <div className="flex justify-between gap-4"><span className="font-medium">{t.when}</span><span className="text-[var(--primary)]">{t.score}</span></div>
                  <p className="text-sm text-white/65">{t.what}</p>
                </li>
              ))}
            </ol>
          </section>
        )}
        {c.sections.map((s) => (
          <section key={s.heading} className="mt-10">
            <h2 className="mb-2 text-2xl font-medium">{s.heading}</h2>
            <p className="leading-relaxed text-white/75">{s.body}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
