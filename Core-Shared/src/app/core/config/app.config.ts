export const APP_CONFIG = {
    appName: 'Core-Shared Architecture',
    version: '1.0.0',
    defaultLanguage: 'en',
    dateFormat: 'yyyy-MM-dd',
    timeFormat: 'HH:mm:ss',
    pagination: {
        defaultPageSize: 10,
        pageSizeOptions: [5, 10, 25, 50, 100]
    },
    theme: {
        defaultTheme: 'light' as const,
        allowThemeSwitch: true
    },
    features: {
        enableNotifications: true,
        enableAnalytics: false,
        enableDarkMode: true
    }
};
