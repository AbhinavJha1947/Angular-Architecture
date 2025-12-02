import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header.component';
import { AuthService } from '../../modules/auth/services/auth.service';
import { of } from 'rxjs';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let authServiceSpy: jasmine.SpyObj<AuthService>;

    beforeEach(async () => {
        const spy = jasmine.createSpyObj('AuthService', ['logout'], {
            isAuthenticated$: of(true),
            currentUser$: of({ name: 'Test User', email: 'test@example.com' })
        });

        await TestBed.configureTestingModule({
            declarations: [HeaderComponent],
            imports: [RouterTestingModule],
            providers: [
                { provide: AuthService, useValue: spy }
            ]
        })
            .compileComponents();

        authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
