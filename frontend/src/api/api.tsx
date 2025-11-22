// api.ts
const BASE_URL = "http://localhost:8080/api/";

export async function apiGet<T>(path: string): Promise<T> {
    const res = await fetch(`${BASE_URL}${path}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json() as Promise<T>;
}