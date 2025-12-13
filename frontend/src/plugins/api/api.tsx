const BASE_URL = "http://localhost:8080/api/";

export async function apiGet<TResponse>(
    path: string,
    params?: Record<string, string>,
): Promise<TResponse> {
    const url = new URL(`${BASE_URL}${path}`);
    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.append(key, value);
        });
    }
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json() as Promise<TResponse>;
}

export async function apiPost<TBody, TResponse>(
    path: string,
    body: TBody,
): Promise<TResponse> {
    const res = await fetch(`${BASE_URL}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json() as Promise<TResponse>;
}
