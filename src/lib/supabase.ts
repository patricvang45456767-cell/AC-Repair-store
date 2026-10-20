// Minimal Supabase REST client (PostgREST + GoTrue) using fetch only.
// Only the *publishable* key is used here. Never put the service_role / secret key in frontend code.

const SUPABASE_URL: string = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.replace(/\/$/, '') || '';
const SUPABASE_KEY: string = (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined) || '';

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_KEY);

const SESSION_KEY = 'abc_admin_session';

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  expiresAt: number; // epoch seconds
  email: string;
}

export class SupabaseError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

function readSession(): AuthSession | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as AuthSession) : null;
  } catch {
    return null;
  }
}

function writeSession(session: AuthSession | null) {
  try {
    if (session) sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    else sessionStorage.removeItem(SESSION_KEY);
  } catch {
    // storage unavailable
  }
}

function toSession(body: any): AuthSession {
  return {
    accessToken: body.access_token,
    refreshToken: body.refresh_token,
    expiresAt: body.expires_at || Math.floor(Date.now() / 1000) + (body.expires_in || 3600),
    email: body.user?.email || '',
  };
}

function baseHeaders(token?: string): Record<string, string> {
  return {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${token || SUPABASE_KEY}`,
    'Content-Type': 'application/json',
  };
}

async function parseError(res: Response): Promise<SupabaseError> {
  let msg = `Request failed (${res.status})`;
  try {
    const body = await res.json();
    msg = body.message || body.msg || body.error_description || body.error || msg;
  } catch {
    // non-JSON body
  }
  return new SupabaseError(msg, res.status);
}

export async function signInWithPassword(email: string, password: string): Promise<AuthSession> {
  if (!isSupabaseConfigured) throw new SupabaseError('Supabase is not configured.', 0);
  const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: baseHeaders(),
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw await parseError(res);
  const session = toSession(await res.json());
  writeSession(session);
  return session;
}

export function signOut() {
  const session = readSession();
  writeSession(null);
  if (session && isSupabaseConfigured) {
    // best-effort server-side revoke
    fetch(`${SUPABASE_URL}/auth/v1/logout`, { method: 'POST', headers: baseHeaders(session.accessToken) }).catch(() => {});
  }
}

async function getAccessToken(): Promise<string | null> {
  const session = readSession();
  if (!session) return null;
  if (session.expiresAt - 30 > Math.floor(Date.now() / 1000)) return session.accessToken;
  // refresh
  try {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`, {
      method: 'POST',
      headers: baseHeaders(),
      body: JSON.stringify({ refresh_token: session.refreshToken }),
    });
    if (!res.ok) throw await parseError(res);
    const next = toSession(await res.json());
    writeSession(next);
    return next.accessToken;
  } catch {
    writeSession(null);
    return null;
  }
}

export function hasStoredSession(): boolean {
  return readSession() !== null;
}

export function getSessionEmail(): string {
  return readSession()?.email || '';
}

interface RestOptions {
  method?: 'GET' | 'POST' | 'PATCH';
  body?: unknown;
  auth?: boolean; // use signed-in user's token instead of the anon key
  prefer?: string;
}

export async function rest<T = any>(path: string, opts: RestOptions = {}): Promise<T> {
  if (!isSupabaseConfigured) throw new SupabaseError('Supabase is not configured.', 0);
  let token: string | undefined;
  if (opts.auth) {
    const t = await getAccessToken();
    if (!t) throw new SupabaseError('Session expired. Please sign in again.', 401);
    token = t;
  }
  const headers = baseHeaders(token);
  if (opts.prefer) headers.Prefer = opts.prefer;
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    method: opts.method || 'GET',
    headers,
    body: opts.body === undefined ? undefined : JSON.stringify(opts.body),
  });
  if (!res.ok) throw await parseError(res);
  if (res.status === 204) return undefined as T;
  const text = await res.text();
  return (text ? JSON.parse(text) : undefined) as T;
}

export function rpc<T = any>(fn: string, args: Record<string, unknown>, auth = false): Promise<T> {
  return rest<T>(`rpc/${fn}`, { method: 'POST', body: args, auth });
}
