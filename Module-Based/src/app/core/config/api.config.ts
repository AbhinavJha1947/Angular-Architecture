import { environment } from '../../../environments/environment';

export const apiConfig = {
    baseUrl: environment.apiUrl,
    endpoints: {
        auth: {
            login: 'auth/login',
            register: 'auth/register',
            logout: 'auth/logout',
            refresh: 'auth/refresh',
            forgotPassword: 'auth/forgot-password',
            resetPassword: 'auth/reset-password'
        },
        users: {
            list: 'users',
            details: 'users/:id',
            create: 'users',
            update: 'users/:id',
            delete: 'users/:id'
        },
        products: {
            list: 'products',
            details: 'products/:id',
            create: 'products',
            update: 'products/:id',
            delete: 'products/:id',
            search: 'products/search'
        },
        orders: {
            list: 'orders',
            details: 'orders/:id',
            create: 'orders',
            update: 'orders/:id',
            cancel: 'orders/:id/cancel'
        },
        dashboard: {
            stats: 'dashboard/stats',
            recentActivity: 'dashboard/recent-activity'
        }
    },
    timeout: 30000, // 30 seconds
    retryAttempts: 3,
    retryDelay: 1000 // 1 second
};

export function buildEndpoint(endpoint: string, params: Record<string, string | number> = {}): string {
    let url = endpoint;
    Object.keys(params).forEach(key => {
        url = url.replace(`:${key}`, String(params[key]));
    });
    return url;
}
