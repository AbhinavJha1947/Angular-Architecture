import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
    selector: '[appDebounce]'
})
export class DebounceDirective {
    @Input() debounceTime = 300;
    @Output() debounceClick = new EventEmitter();
    private clicks = new Subject<Event>();

    constructor() {
        this.clicks.pipe(
            debounceTime(this.debounceTime)
        ).subscribe(e => this.debounceClick.emit(e));
    }

    @HostListener('click', ['$event'])
    clickEvent(event: Event): void {
        event.preventDefault();
        event.stopPropagation();
        this.clicks.next(event);
    }
}
