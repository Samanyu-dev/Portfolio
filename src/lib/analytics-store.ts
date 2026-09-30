// Tiny Redis-over-REST store (Upstash / Vercel KV). Without env vars, everything no-ops.
const URL_ = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
export const storeConfigured = !!(URL_ && TOKEN);

export const TYPES = ["section_view", "project_click", "project_github", "hackathon_click", "hackathon_github", "hackathon_study", "case_study_view", "chess"] as const;
const day = (d = new Date()) => d.toISOString().slice(0, 10);

async function pipeline(cmds: (string | number)[][]) {
  const r = await fetch(`${URL_}/pipeline`, {
    method: "POST", headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(cmds), cache: "no-store",
  });
  return (await r.json()) as { result: unknown }[];
}

export async function record(type: string, id: string) {
  if (!storeConfigured) return;
  const f = `${type}:${id}`, dk = `pf:day:${day()}`;
  await pipeline([["HINCRBY", "pf:totals", f, 1], ["HINCRBY", dk, f, 1], ["EXPIRE", dk, 60 * 60 * 24 * 120]]);
}

const toObj = (flat: unknown): Record<string, number> => {
  const a = (flat as string[]) ?? [], o: Record<string, number> = {};
  for (let i = 0; i < a.length; i += 2) o[a[i]] = Number(a[i + 1]);
  return o;
};

export async function readAll(days = 14) {
  const keys = Array.from({ length: days }, (_, i) => day(new Date(Date.now() - i * 864e5))).reverse();
  const res = await pipeline([["HGETALL", "pf:totals"], ...keys.map((k) => ["HGETALL", `pf:day:${k}`])]);
  return { totals: toObj(res[0].result), daily: keys.map((k, i) => ({ day: k, counts: toObj(res[i + 1].result) })) };
}
