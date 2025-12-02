import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    private config = {
        production: environment.production,
        apiUrl: environment.apiUrl,
        appName: 'Feature-Based App',
        version: '1.0.0'
    };

    constructor() { }

    get(key: string): any {
        return this.config[key as keyof typeof this.config];
    }

    getAll(): any {
        return { ...this.config };
    }
}
