import { clearToken, getToken, setToken } from '../utils/tokenStorage';

interface Authenticate extends Response {
    json: () => Promise<{ token: string }>;
}

export class AuthenticateError {
    public data;
    constructor(data: Record<string, string>) {
        this.data = data;
    }
}

export const authenticate = () => {
    if (
        getToken() &&
        import.meta.env.VITE_API_KEY &&
        import.meta.env.VITE_API_SECRET
    ) {
        return { token: getToken() };
    }

    // For now, clear any existing token and re-authenticate
    clearToken();

    fetch('/proxy/api/v4/developer/sign-in', {
        method: 'POST',
        body: JSON.stringify({
            apiKey: import.meta.env.VITE_API_KEY,
            apiSecret: import.meta.env.VITE_API_SECRET,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(async (res: Authenticate) => {
        const data = await res.json();
        if (res.ok) {
            setToken(data.token);
            window.location.reload();
        }
        throw new AuthenticateError(data);
    });
};
