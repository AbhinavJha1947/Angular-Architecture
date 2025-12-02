import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { HomeData } from './home.model';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    data: HomeData | null = null;

    constructor(private homeService: HomeService) { }

    ngOnInit(): void {
        this.homeService.getHomeData().subscribe(data => {
            this.data = data;
        });
    }
}
