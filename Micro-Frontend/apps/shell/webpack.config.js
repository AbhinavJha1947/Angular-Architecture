const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
    path.join(__dirname, '../../tsconfig.json'),
    [/* Add shared libraries here */]
);

module.exports = {
    output: {
        uniqueName: "shell",
        publicPath: "auto"
    },
    optimization: {
        runtimeChunk: false
    },
    resolve: {
        alias: {
            ...sharedMappings.getAliases(),
        }
    },
    experiments: {
        outputModule: true
    },
    plugins: [
        new ModuleFederationPlugin({
            library: { type: "module" },
            remotes: {
                "products": "http://localhost:4201/remoteEntry.js",
                "orders": "http://localhost:4202/remoteEntry.js",
                "auth": "http://localhost:4203/remoteEntry.js",
            },
            shared: {
                "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
                "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
                "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
                "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
                ...sharedMappings.getDescriptors()
            }
        }),
        sharedMappings.getPlugin()
    ],
};
