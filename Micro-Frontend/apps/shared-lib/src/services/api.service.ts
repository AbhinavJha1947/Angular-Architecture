import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private apiUrl = 'http://localhost:3000/api'; // Default API URL

    constructor(private http: HttpClient) { }

    setApiUrl(url: string): void {
        this.apiUrl = url;
    }

    get<T>(endpoint: string, params?: HttpParams): Observable<T> {
        return this.http.get<T>(`${this.apiUrl}/${endpoint}`, { params });
    }

    post<T>(endpoint: string, data: any): Observable<T> {
        return this.http.post<T>(`${this.apiUrl}/${endpoint}`, data);
    }

    put<T>(endpoint: string, data: any): Observable<T> {
        return this.http.put<T>(`${this.apiUrl}/${endpoint}`, data);
    }

    delete<T>(endpoint: string): Observable<T> {
        return this.http.delete<T>(`${this.apiUrl}/${endpoint}`);
    }

    patch<T>(endpoint: string, data: any): Observable<T> {
        return this.http.patch<T>(`${this.apiUrl}/${endpoint}`, data);
    }
}
