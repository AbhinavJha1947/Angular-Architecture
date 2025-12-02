export const API_CONFIG = {
    baseUrl: 'http://localhost:3000/api',
    endpoints: {
        auth: {
            login: '/auth/login',
            register: '/auth/register',
            logout: '/auth/logout',
            refresh: '/auth/refresh'
        },
        users: {
            getAll: '/users',
            getById: '/users/:id',
            create: '/users',
            update: '/users/:id',
            delete: '/users/:id'
        },
        products: {
            getAll: '/products',
            getById: '/products/:id',
            create: '/products',
            update: '/products/:id',
            delete: '/products/:id'
        },
        orders: {
            getAll: '/orders',
            getById: '/orders/:id',
            create: '/orders',
            update: '/orders/:id',
            cancel: '/orders/:id/cancel'
        }
    },
    timeout: 30000,
    retryAttempts: 3
};
