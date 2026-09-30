// Fire-and-forget event beacon for the owner-only dashboard (/admin). No-ops on failure.
export function track(type: string, id: string) {
  try {
    if (typeof window === "undefined" || window.location.pathname.startsWith("/admin")) return;
    const body = JSON.stringify({ type, id });
    if (navigator.sendBeacon) navigator.sendBeacon("/api/track", new Blob([body], { type: "application/json" }));
    else fetch("/api/track", { method: "POST", body, keepalive: true });
  } catch { /* analytics must never break the page */ }
}
