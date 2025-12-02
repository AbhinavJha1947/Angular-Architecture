import { TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DashboardComponent]
        }).compileComponents();
    });

    it('should create', () => {
        const fixture = TestBed.createComponent(DashboardComponent);
        const component = fixture.componentInstance;
        expect(component).toBeTruthy();
    });
});
