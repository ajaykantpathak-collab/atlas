/** API client for the platform backend. */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001";

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

/** Build headers with auth token if available. */
function authHeaders(): Record<string, string> {
  const token = getAuthToken();
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

async function fetchAPI<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { ...authHeaders(), ...options?.headers },
    ...options,
  });
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
