export const mfeConfig = {
    name: 'products',
    port: 4201,
    exposedModules: {
        './Routes': './src/app/remote-entry/entry.routes.ts'
    }
};
