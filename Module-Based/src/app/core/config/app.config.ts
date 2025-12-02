export const appConfig = {
    appName: 'Module-Based Architecture',
    version: '1.0.0',
    defaultLanguage: 'en',
    supportedLanguages: ['en', 'es', 'fr', 'de'],
    dateFormat: 'YYYY-MM-DD',
    timeFormat: 'HH:mm:ss',
    pagination: {
        defaultPageSize: 10,
        pageSizeOptions: [5, 10, 25, 50, 100]
    },
    theme: {
        default: 'auto' as 'light' | 'dark' | 'auto'
    },
    session: {
        timeout: 30 * 60 * 1000, // 30 minutes in milliseconds
        warningTime: 5 * 60 * 1000 // 5 minutes before timeout
    }
};
