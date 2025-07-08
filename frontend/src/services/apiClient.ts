import { type IUser, type IUserCreate } from './../common/User';

export class ApiClient {
    baseUrl: string

    constructor(url?: string) {
        this.baseUrl = url || 'http://localhost:8080';
    }

    async login(credentials: {username: string, password: string}): Promise<IUser> {
        return this.fetchData(`${this.baseUrl}/auth/login`, {
            body: JSON.stringify(credentials),
        })
    }

    async register(user: IUserCreate): Promise<IUser> {
        return this.fetchData(`${this.baseUrl}/auth/register`, {
            body: JSON.stringify(user),
        })
    }

    private async fetchData<D>(url: string, options?: RequestInit): Promise<D> {
        const basicHeaders: HeadersInit = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${this.access_token}`
        };
        const mergedOptions: RequestInit = {
            ...options,
            credentials: 'include',
            headers: {
                ...basicHeaders,
                ...(options?.headers || {})
            }
        };

        const res = await fetch(url, mergedOptions);
        if (!res.ok) {
            const err = await res.json();
            console.error(err.message);
        }

        return res.json();
    }
}