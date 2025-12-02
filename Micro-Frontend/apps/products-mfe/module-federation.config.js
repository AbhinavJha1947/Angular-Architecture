module.exports = {
    name: 'products',
    filename: 'remoteEntry.js',
    exposes: {
        './Routes': './src/app/remote-entry/entry.routes.ts'
    },
    shared: {
        '@angular/core': { singleton: true, strictVersion: true },
        '@angular/common': { singleton: true, strictVersion: true },
        '@angular/router': { singleton: true, strictVersion: true }
    }
};
