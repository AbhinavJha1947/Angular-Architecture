import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HomeData } from './home.model';

@Injectable({
    providedIn: 'root'
})
export class HomeService {
    getHomeData(): Observable<HomeData> {
        // Mock data
        return of({
            title: 'Welcome to Our Store',
            description: 'Best products at best prices',
            featuredProducts: []
        });
    }
}
