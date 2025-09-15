const TOKEN_KEY = 'auth_token';

export function setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
}

export function getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
}

export function clearToken() {
    localStorage.removeItem(TOKEN_KEY);
}

/**
 * Assumption:
 * That the TOKEN persists for a long time.
 * Then we check if the env variables are set correctly.
 */
export function isAuthenticated() {
    return (
        getToken() &&
        import.meta.env.VITE_API_KEY &&
        import.meta.env.VITE_API_SECRET
    );
}
