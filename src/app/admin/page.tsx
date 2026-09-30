import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createHash, timingSafeEqual } from "crypto";
import { readAll, storeConfigured } from "@/lib/analytics-store";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin", robots: { index: false, follow: false } };

const PW = process.env.ADMIN_PASSWORD;
const token = (pw: string) => createHash("sha256").update(`pf-admin|${pw}`).digest("hex");
const safeEq = (a: string, b: string) => a.length === b.length && timingSafeEqual(Buffer.from(a), Buffer.from(b));

async function login(form: FormData) {
  "use server";
  await new Promise((r) => setTimeout(r, 600)); // slow brute force
  const pw = String(form.get("pw") ?? "");
  if (PW && safeEq(token(pw), token(PW))) {
    cookies().set("pf_admin", token(PW), { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/admin", maxAge: 60 * 60 * 8 });
  }
  redirect("/admin");
}
async function logout() {
  "use server";
  cookies().delete("pf_admin");
  redirect("/admin");
}

const LABEL: Record<string, string> = {
  section_view: "Section views", project_click: "Project clicks", project_github: "Project GitHub clicks", hackathon_click: "Hackathon clicks",
  hackathon_github: "Hackathon GitHub clicks", hackathon_study: "Case-study link clicks", case_study_view: "Case-study page views", chess: "Chess",
};

export default async function Admin() {
  const c = cookies().get("pf_admin")?.value;
  const authed = !!PW && !!c && safeEq(c, token(PW));
  const box = "mx-auto max-w-4xl px-6 py-16 text-white";
  if (!PW) return <main className={box}><h1 className="text-2xl font-semibold">Admin locked</h1><p className="mt-3 text-white/70">Set <code>ADMIN_PASSWORD</code> in the environment to enable this page.</p></main>;
  if (!authed) return (
    <main className={box}>
      <h1 className="text-2xl font-semibold">Owner login</h1>
      <form action={login} className="mt-6 flex gap-3">
        <input name="pw" type="password" autoComplete="current-password" className="rounded-lg border border-white/20 bg-white/10 px-4 py-2" placeholder="Password" />
        <button className="rounded-lg bg-white px-5 py-2 font-semibold text-black">Enter</button>
      </form>
    </main>
  );

  const data = storeConfigured ? await readAll(14) : null;
  const groups: Record<string, [string, number][]> = {};
  if (data) for (const [k, v] of Object.entries(data.totals)) { const [t, ...rest] = k.split(":"); (groups[t] ??= []).push([rest.join(":"), v]); }
  const dayTotals = data?.daily.map((d) => ({ day: d.day, n: Object.values(d.counts).reduce((a, b) => a + b, 0) })) ?? [];
  const maxDay = Math.max(1, ...dayTotals.map((d) => d.n));

  return (
    <main className={box}>
      <div className="flex items-center justify-between"><h1 className="text-3xl font-semibold">Portfolio analytics</h1>
        <form action={logout}><button className="rounded-lg border border-white/30 px-4 py-1.5 text-sm">Log out</button></form></div>
      {!data && <p className="mt-6 rounded-xl border border-yellow-400/40 bg-yellow-400/10 p-4 text-sm">No store connected. Add a Redis integration (Upstash via the Vercel Marketplace) so <code>UPSTASH_REDIS_REST_URL</code> and <code>UPSTASH_REDIS_REST_TOKEN</code> (or <code>KV_REST_API_URL</code>/<code>KV_REST_API_TOKEN</code>) exist, then redeploy. Events are dropped until then.</p>}
      {data && (<>
        <section className="mt-8"><h2 className="mb-3 text-lg font-medium">Events, last 14 days</h2>
          <div className="flex h-32 items-end gap-1">{dayTotals.map((d) => (
            <div key={d.day} title={`${d.day}: ${d.n}`} className="flex-1 rounded-t bg-pink-500" style={{ height: `${(d.n / maxDay) * 100}%`, minHeight: 2 }} />))}</div>
        </section>
        {Object.keys(LABEL).filter((t) => groups[t]).map((t) => {
          const rows = groups[t].sort((a, b) => b[1] - a[1]); const max = rows[0][1];
          return (
            <section key={t} className="mt-8"><h2 className="mb-3 text-lg font-medium">{LABEL[t]}</h2>
              <div className="space-y-2">{rows.map(([id, n]) => (
                <div key={id} className="flex items-center gap-3 text-sm"><span className="w-56 shrink-0 truncate">{id}</span>
                  <div className="h-3 flex-1 rounded bg-white/10"><div className="h-3 rounded bg-yellow-400" style={{ width: `${(n / max) * 100}%` }} /></div>
                  <span className="w-10 text-right tabular-nums">{n}</span></div>))}</div></section>);
        })}
      </>)}
    </main>
  );
}
