/** API client for the platform backend. */

// Backend base URL policy:
//  - NEXT_PUBLIC_API_URL env override wins when set (dedicated backend host).
//  - Default is RELATIVE ('') in the browser: same-origin /api/... requests go
//    through Next's rewrites on :3000 in dev and nginx in production, so no
//    cross-origin request (and no CORS) is ever involved. The previous
//    absolute http://localhost:8001 fallback made every browser fetch
//    cross-origin and CORS-blocked when the env var was unset.
//  - On the server (SSR / route handlers) fall back to the local backend.
const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window !== "undefined" ? "" : "http://localhost:8001");

/** Get auth token — reads all legacy keys so old pages keep working.
 *  Canonical writer is studentStore ('token' + 'refresh_token'); this
 *  helper tolerates 'auth_token' and the zustand 'dream-auth' store. */
export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return (
    localStorage.getItem("token") ||
    localStorage.getItem("auth_token") ||
    (() => {
      try {
        const raw = localStorage.getItem("dream-auth");
        return raw ? JSON.parse(raw)?.state?.token || null : null;
      } catch {
        return null;
      }
    })()
  );
}

/** Read the stored refresh token (single location — studentStore and, as
 *  of the PLUMB auth-ux fix, authStore login/signup both write
 *  localStorage 'refresh_token'). */
function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem("refresh_token");
  } catch {
    return null;
  }
}

/** Persist a refreshed credential pair everywhere the app reads tokens.
 *  Keeps getAuthToken() consumers (pages that build their own Authorization
 *  header per call) on a fresh access token without touching each page. */
function storeTokens(access: string, refresh: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("token", access);
    localStorage.setItem("refresh_token", refresh);
    localStorage.removeItem("auth_token");
    // Keep the zustand dream-auth store in sync so pages reading
    // useAuthStore().token (authStore.persist) see the new token too.
    const raw = localStorage.getItem("dream-auth");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed?.state?.token) {
          parsed.state.token = access;
          localStorage.setItem("dream-auth", JSON.stringify(parsed));
        }
      } catch { /* store unreadable — leave it */ }
    }
  } catch { /* storage unavailable (SSR/private mode) */ }
}

function clearTokens(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("auth_token");
    localStorage.removeItem("refresh_token");
  } catch { /* ignore */ }
}

/* PLUMB (C8 audit [STUDENT-C8][P2 AUTH-UX]): the 30-minute access token
 * used to kill any session that outlived it mid-flow — a diagnostic walk
 * recorded answers 1-7 then every call 401'd, with the refresh_token from
 * login sitting unused in storage. Two layers fix that here:
 *
 *  1. REACTIVE — refreshOn401(): exchange the refresh token for a new
 *     pair (POST /api/auth/refresh, single-flight so parallel 401s share
 *     one exchange) and retry the original request once.
 *  2. PROACTIVE — startTokenRefresher(): schedules a refresh at ~80% of
 *     the access token's lifetime (and re-arms on tab focus) so surfaces
 *     that read getAuthToken() per call — the chapter-test page's local
 *     fetches, the diagnostic page's raw fetches — simply never hold an
 *     expired token. Started lazily on the first authenticated request. */

let refreshInFlight: Promise<boolean> | null = null;
let lastRefreshAt = 0;

/** Exchange the stored refresh token for a fresh pair. Single-flight;
 *  resolves false only when there is no refresh token or the exchange is
 *  rejected (caller should then surface the re-login). */
export function refreshOn401(): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);
  if (refreshInFlight) return refreshInFlight;
  const refreshToken = getRefreshToken();
  if (!refreshToken) return Promise.resolve(false);
  // Coalesce bursts: a retry issued <2s after a successful refresh would
  // only race the token it already got.
  if (Date.now() - lastRefreshAt < 2000) return Promise.resolve(true);

  refreshInFlight = (async () => {
    try {
      const res = await fetch(`${API_BASE}/api/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });
      if (!res.ok) {
        if (res.status === 401 || res.status === 400) clearTokens();
        return false;
      }
      const data = await res.json();
      const access = data.access_token || data.token;
      if (!access) return false;
      storeTokens(access, data.refresh_token || refreshToken);
      lastRefreshAt = Date.now();
      scheduleProactiveRefresh(data.expires_in);
      return true;
    } catch {
      return false; // network blip — keep tokens, let the retry fail honestly
    } finally {
      refreshInFlight = null;
    }
  })();
  return refreshInFlight;
}

let refreshTimer: ReturnType<typeof setTimeout> | null = null;

/** Seconds until the current access token expires (from its JWT exp), or
 *  null when unreadable. JWTs here carry a numeric `exp` — cheap to read,
 *  no verification needed (the backend verifies). */
function accessTokenSecondsLeft(): number | null {
  const token = getAuthToken();
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
    return typeof payload.exp === "number" ? payload.exp - Date.now() / 1000 : null;
  } catch {
    return null;
  }
}

function scheduleProactiveRefresh(expiresIn?: number): void {
  if (typeof window === "undefined") return;
  const ttlMs = Number(expiresIn) > 0 ? Number(expiresIn) * 1000 : 30 * 60 * 1000;
  // Refresh at 80% of lifetime — comfortably before expiry, never hot-looping.
  const delay = Math.max(30_000, ttlMs * 0.8);
  if (refreshTimer) clearTimeout(refreshTimer);
  refreshTimer = setTimeout(() => { void refreshOn401(); }, delay);
}

let refresherStarted = false;

/** Idempotent: arms the proactive refresher + focus re-arm. Called on the
 *  first authenticated request through fetchAPI/authFetch. */
function startTokenRefresher(): void {
  if (refresherStarted || typeof window === "undefined") return;
  refresherStarted = true;
  if (!getRefreshToken()) return;
  const left = accessTokenSecondsLeft();
  if (left === null || left < 6 * 60) {
    // Unreadable or already-near-expiry token: refresh soon.
    scheduleProactiveRefresh(Math.max((left ?? 0) * 1000, 30_000) / 0.8);
  } else {
    scheduleProactiveRefresh(left);
  }
  window.addEventListener("focus", () => {
    // A tab reopened after being parked may hold a stale token. Only fire
    // when the bearer is genuinely near/past expiry — refreshing on every
    // focus would race refresh-token rotation across tabs.
    const leftNow = accessTokenSecondsLeft();
    if (getRefreshToken() && (leftNow === null || leftNow < 60)) {
      void refreshOn401();
    }
  });
}

/** fetch with Authorization header + one silent 401-retry.
 *  Drop-in for the raw `fetch` + getAuthToken() pattern the student
 *  surfaces (diagnostic, practice, chapter-test) use — the reactive half
 *  of the mid-session expiry fix. */
export async function authFetch(path: string, options: RequestInit = {}): Promise<Response> {
  const token = getAuthToken();
  const headers = new Headers(options.headers || {});
  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  startTokenRefresher();
  const doFetch = () =>
    fetch(`${API_BASE}${path}`, { ...options, headers });
  let res = await doFetch();
  if (res.status === 401 && getRefreshToken()) {
    const ok = await refreshOn401();
    if (ok) res = await doFetch();
  }
  return res;
}

/** Build headers with auth token if available. */
function authHeaders(): Record<string, string> {
  const token = getAuthToken();
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

async function fetchAPI<T>(path: string, options?: RequestInit): Promise<T> {
  startTokenRefresher();
  let res = await fetch(`${API_BASE}${path}`, {
    headers: { ...authHeaders(), ...options?.headers },
    ...options,
  });
  // Silent refresh on a mid-session expiry, then retry the original call
  // once with the new bearer (C8 audit [STUDENT-C8][P2 AUTH-UX]).
  if (res.status === 401 && getRefreshToken()) {
    const ok = await refreshOn401();
    if (ok) {
      res = await fetch(`${API_BASE}${path}`, {
        headers: { ...authHeaders(), ...options?.headers },
        ...options,
      });
    }
  }
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API error ${res.status}: ${text || res.statusText}`);
  }
  return res.json();
}

export const api = {
  // Generic methods (for platform services)
  get: <T>(path: string) => fetchAPI<T>(path),
  post: <T>(path: string, body?: unknown) =>
    fetchAPI<T>(path, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    }),
  put: <T>(path: string, body?: unknown) =>
    fetchAPI<T>(path, {
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    }),
  patch: <T>(path: string, body?: unknown) =>
    fetchAPI<T>(path, {
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    }),
  delete: <T>(path: string) =>
    fetchAPI<T>(path, { method: "DELETE" }),

  // Nodes — backed by the file-served teaching corpus (/api/nodes)
  getNodes: (subject?: string) =>
    fetchAPI<{ nodes: any[] }>(`/api/nodes/by-class-subject?class=10&subject=${subject || "phy"}&limit=500`)
      .then((d) => d.nodes),
  getNode: (nodeId: string) =>
    fetchAPI<any>(`/api/nodes/node?node_id=${encodeURIComponent(nodeId)}`),

  // Questions
  getQuestions: (nodeId: string, tier: string = "novice", count: number = 1) =>
    fetchAPI<any[]>(`/questions/${nodeId}?tier=${tier}&count=${count}`),
  checkAnswer: (nodeId: string, answer: string, expected: string) =>
    fetchAPI<any>(`/questions/${nodeId}/check`, {
      method: "POST",
      body: JSON.stringify({ answer, expected }),
    }),

  // Content — full teaching node (definition, walkthrough, diagnostics)
  getContent: (nodeId: string) =>
    fetchAPI<any>(`/api/nodes/node?node_id=${encodeURIComponent(nodeId)}`),

  // Mastery
  getMastery: (userId: number, nodeId: string) =>
    fetchAPI<any>(`/mastery/${userId}/${nodeId}`),
  updateMastery: (userId: number, nodeId: string, correct: boolean) =>
    fetchAPI<any>(`/mastery/${userId}/${nodeId}/update`, {
      method: "POST",
      body: JSON.stringify({ correct }),
    }),

  // Tutor
  sendTutorMessage: (userId: number, nodeId: string, message: string,
                     wrongStreak: number = 0, pauseSeconds: number = 0) =>
    fetchAPI<any>(`/tutor/message`, {
      method: "POST",
      body: JSON.stringify({
        user_id: userId,
        node_id: nodeId,
        message,
        wrong_streak: wrongStreak,
        pause_seconds: pauseSeconds,
      }),
    }),

  // Sub-skills
  getSubskills: (nodeId: string) =>
    fetchAPI<any>(`/subskills/${nodeId}`),

  // Sim
  getSims: () => fetchAPI<any[]>(`/sim/`),
  getSimForNode: (nodeId: string) =>
    fetchAPI<any>(`/sim/node/${nodeId}`),

  // Graph
  getPrereqs: (nodeId: string) =>
    fetchAPI<any>(`/graph/${nodeId}/prereqs`),

  // Dashboard
  getParentDashboard: (userId: number) =>
    fetchAPI<any>(`/dashboard/parent/${userId}`),

  // Story
  getStoryState: (userId: number) =>
    fetchAPI<any>(`/story/${userId}`),
  advanceEpisode: (userId: number) =>
    fetchAPI<any>(`/story/${userId}/advance`, { method: "POST" }),

  // Health
  health: () => fetchAPI<any>(`/health`),
};
