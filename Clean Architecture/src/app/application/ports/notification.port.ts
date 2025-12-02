import { Observable } from 'rxjs';

export interface NotificationPort {
    send(message: string): Observable<void>;
    showError(error: string): void;
    showSuccess(message: string): void;
}
