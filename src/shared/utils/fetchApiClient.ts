const DEFAULT_TIMEOUT_MS = 30_000;

let onUnauthorized: (() => void) | null = null;

/** Optional: run when the API returns 401 (e.g. redirect to login). */
export function configureUnauthorizedHandler(handler: (() => void) | null) {
  onUnauthorized = handler;
}

// function buildUrl(path: string): string {
//   const base = (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");
//   if (path.startsWith("http://") || path.startsWith("https://")) return path;
//   return `${base}/${path.replace(/^\//, "")}`;
// }

export class ApiError extends Error {
  readonly status: number;
  readonly body: unknown;

  constructor(message: string, status: number, body?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

async function throwIfNotOk(res: Response): Promise<never> {
  let body: unknown;
  const ct = res.headers.get("content-type");
  try {
    if (ct?.includes("application/json")) {
      body = await res.json();
    } else {
      body = await res.text();
    }
  } catch {
    body = undefined;
  }
  throw new ApiError(res.statusText || "Request failed", res.status, body);
}

export type ApiRequestInit = Omit<RequestInit, "body"> & {
  body?: BodyInit | null;
  /** JSON body; sets `Content-Type: application/json` and serializes (overrides `body`). */
  json?: unknown;
};

/**
 * Low-level fetch with base URL, timeout, cookies (`credentials: "include"`),
 * and 401 handling. Session cookies are sent by the browser; no Bearer tokens.
 */
export async function apiRequest(
  path: string,
  init: ApiRequestInit = {},
): Promise<Response> {
  const { json, body: rawBody, signal, ...rest } = init;
  void signal;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

  const headers = new Headers(rest.headers);

  let body: BodyInit | null | undefined =
    rawBody === null ? null : (rawBody ?? undefined);
  if (json !== undefined) {
    headers.set("Content-Type", "application/json");
    body = JSON.stringify(json);
  }

  const url = path;

  try {
    const res = await fetch(url, {
      ...rest,
      headers,
      body: body ?? null,
      signal: controller.signal,
      credentials: init.credentials ?? "include",
    });
    if (res.status === 401) {
      onUnauthorized?.();
    }
    return res;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function parseJsonOrEmpty<T>(res: Response): Promise<T> {
  const text = await res.text();
  if (!text) return undefined as T;
  return JSON.parse(text) as T;
}

/**
 * Convenience API similar to axios: throws `ApiError` when `!res.ok`, parses JSON bodies.
 */
export const apiClient = {
  async get<T>(
    path: string,
    init?: Omit<ApiRequestInit, "json" | "method">,
  ): Promise<T> {
    const res = await apiRequest(path, { ...init, method: "GET" });
    if (!res.ok) await throwIfNotOk(res);
    if (res.status === 204) return undefined as T;
    return parseJsonOrEmpty<T>(res);
  },

  async post<T>(
    path: string,
    json?: unknown,
    init?: Omit<ApiRequestInit, "json" | "method">,
  ): Promise<T> {
    const res = await apiRequest(path, { ...init, method: "POST", json });
    if (!res.ok) await throwIfNotOk(res);
    if (res.status === 204) return undefined as T;
    return parseJsonOrEmpty<T>(res);
  },

  async put<T>(
    path: string,
    json?: unknown,
    init?: Omit<ApiRequestInit, "json" | "method">,
  ): Promise<T> {
    const res = await apiRequest(path, { ...init, method: "PUT", json });
    if (!res.ok) await throwIfNotOk(res);
    if (res.status === 204) return undefined as T;
    return parseJsonOrEmpty<T>(res);
  },

  async patch<T>(
    path: string,
    json?: unknown,
    init?: Omit<ApiRequestInit, "json" | "method">,
  ): Promise<T> {
    const res = await apiRequest(path, { ...init, method: "PATCH", json });
    if (!res.ok) await throwIfNotOk(res);
    if (res.status === 204) return undefined as T;
    return parseJsonOrEmpty<T>(res);
  },

  async delete<T>(
    path: string,
    init?: Omit<ApiRequestInit, "json" | "method">,
  ): Promise<T> {
    const res = await apiRequest(path, { ...init, method: "DELETE" });
    if (!res.ok) await throwIfNotOk(res);
    if (res.status === 204) return undefined as T;
    return parseJsonOrEmpty<T>(res);
  },
};
