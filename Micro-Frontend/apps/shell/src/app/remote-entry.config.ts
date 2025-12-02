export interface RemoteConfig {
    remoteName: string;
    remoteEntry: string;
    exposedModule: string;
}

export const remoteEntryConfig: RemoteConfig[] = [
    {
        remoteName: 'products',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './Routes'
    },
    {
        remoteName: 'orders',
        remoteEntry: 'http://localhost:4202/remoteEntry.js',
        exposedModule: './Routes'
    },
    {
        remoteName: 'auth',
        remoteEntry: 'http://localhost:4203/remoteEntry.js',
        exposedModule: './Routes'
    }
];
