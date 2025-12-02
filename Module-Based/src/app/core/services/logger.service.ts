import { Injectable } from '@angular/core';

export enum LogLevel {
    Debug,
    Info,
    Warn,
    Error
}

@Injectable({
    providedIn: 'root'
})
export class LoggerService {
    private logLevel: LogLevel = LogLevel.Debug;

    setLogLevel(level: LogLevel): void {
        this.logLevel = level;
    }

    debug(message: string, ...args: any[]): void {
        if (this.logLevel <= LogLevel.Debug) {
            console.log(`[DEBUG] ${message}`, ...args);
        }
    }

    info(message: string, ...args: any[]): void {
        if (this.logLevel <= LogLevel.Info) {
            console.info(`[INFO] ${message}`, ...args);
        }
    }

    warn(message: string, ...args: any[]): void {
        if (this.logLevel <= LogLevel.Warn) {
            console.warn(`[WARN] ${message}`, ...args);
        }
    }

    error(message: string, ...args: any[]): void {
        if (this.logLevel <= LogLevel.Error) {
            console.error(`[ERROR] ${message}`, ...args);
        }
    }
}
