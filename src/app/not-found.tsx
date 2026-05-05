import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_24%),linear-gradient(180deg,#050816_0%,#071225_52%,#050816_100%)] px-6 text-white">
      <div className="max-w-xl text-center">
        <p className="eyebrow justify-center">Lost in the orbit</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">That chapter does not exist.</h1>
        <p className="mx-auto mt-5 max-w-lg text-base leading-8 text-slate-300">
          The route you asked for is missing from the current portfolio graph. Head back to the homepage and jump into the story from there.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-full border border-white/10 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.15]"
        >
          Return home
        </Link>
      </div>
    </main>
  );
}
