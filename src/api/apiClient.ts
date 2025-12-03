const API_URL = import.meta.env.VITE_API_BASE_URL;
const TOKEN = import.meta.env.VITE_TOKEN;

export const authenticatedFetch = async (endpoint: string, options: RequestInit = {}) => {

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`,
        ...options?.headers,
    };

    const res = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!res.ok) {
        const errorBody = await res.json().catch(() => ({ message: res.statusText }));
        throw new Error(errorBody.message || `Fallo en la API: ${res.status}`);
    }

    return res.status !== 204 ? res.json() : null;
}