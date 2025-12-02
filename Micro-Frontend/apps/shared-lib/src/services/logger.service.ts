import { Injectable } from '@angular/core';

export enum LogLevel {
    DEBUG = 'DEBUG',
    INFO = 'INFO',
    WARN = 'WARN',
    ERROR = 'ERROR'
}

@Injectable({
    providedIn: 'root'
})
export class LoggerService {
    private logLevel: LogLevel = LogLevel.INFO;
    private enableConsoleLogging = true;

    constructor() { }

    setLogLevel(level: LogLevel): void {
        this.logLevel = level;
    }

    setConsoleLogging(enabled: boolean): void {
        this.enableConsoleLogging = enabled;
    }

    debug(message: string, ...args: any[]): void {
        this.log(LogLevel.DEBUG, message, args);
    }

    info(message: string, ...args: any[]): void {
        this.log(LogLevel.INFO, message, args);
    }

    warn(message: string, ...args: any[]): void {
        this.log(LogLevel.WARN, message, args);
    }

    error(message: string, error?: any, ...args: any[]): void {
        this.log(LogLevel.ERROR, message, [error, ...args]);
    }

    private log(level: LogLevel, message: string, args: any[]): void {
        if (!this.shouldLog(level)) {
            return;
        }

        if (!this.enableConsoleLogging) {
            return;
        }

        const timestamp = new Date().toISOString();
        const formattedMessage = `[${timestamp}] [${level}] ${message}`;

        switch (level) {
            case LogLevel.DEBUG:
            case LogLevel.INFO:
                console.log(formattedMessage, ...args);
                break;
            case LogLevel.WARN:
                console.warn(formattedMessage, ...args);
                break;
            case LogLevel.ERROR:
                console.error(formattedMessage, ...args);
                break;
        }
    }

    private shouldLog(level: LogLevel): boolean {
        const levels = [LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARN, LogLevel.ERROR];
        const currentLevelIndex = levels.indexOf(this.logLevel);
        const messageLevelIndex = levels.indexOf(level);
        return messageLevelIndex >= currentLevelIndex;
    }
}
