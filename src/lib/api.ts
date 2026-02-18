/**
 * API client for Contractor/Contralytic backend.
 * Uses NEXT_PUBLIC_API_URL and sends JWT from localStorage when available.
 */

const getBaseUrl = () =>
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";

const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

export interface ApiError {
  error: string;
  code?: string;
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${getBaseUrl()}${path.startsWith("/") ? path : `/${path}`}`;
  const token = getToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }
  const res = await fetch(url, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const body = data as ApiError;
    const err = new Error(body.error ?? res.statusText) as Error & { code?: string };
    if (typeof body.code === "string") err.code = body.code;
    throw err;
  }
  return data as T;
}

export const api = {
  get: <T>(path: string) => request<T>(path, { method: "GET" }),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "POST", body: JSON.stringify(body) }),
  postFormData: async <T>(path: string, formData: FormData): Promise<T> => {
    const url = `${getBaseUrl()}${path.startsWith("/") ? path : `/${path}`}`;
    const token = getToken();
    const headers: HeadersInit = {};
    if (token) {
      (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
    }
    const res = await fetch(url, { method: "POST", body: formData, headers });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error((data as ApiError).error ?? res.statusText);
    }
    return data as T;
  },
};

export default api;
