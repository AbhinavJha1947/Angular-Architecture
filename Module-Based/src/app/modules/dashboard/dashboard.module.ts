import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../../shared/shared.module';

// Pages
import { HomeComponent } from './pages/home/home.component';

// Components
import { WidgetComponent } from './components/widget/widget.component';
import { ChartComponent } from './components/chart/chart.component';
import { StatsCardComponent } from './components/stats-card/stats-card.component';

@NgModule({
    declarations: [
        HomeComponent,
        WidgetComponent,
        ChartComponent,
        StatsCardComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        DashboardRoutingModule
    ]
})
export class DashboardModule { }
