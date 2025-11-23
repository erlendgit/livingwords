// api.ts
const BASE_URL = "http://localhost:8080/api/";

export async function apiGet<T>(path: string): Promise<T> {
    const res = await fetch(`${BASE_URL}${path}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json() as Promise<T>;
}

export async function apiPost<TBody, TResponse>(path: string, body: TBody): Promise<TResponse> {
    const res = await fetch(`${BASE_URL}${path}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json() as Promise<TResponse>;
}