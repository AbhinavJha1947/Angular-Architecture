import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appAutoFocus]',
    standalone: true
})
export class AutoFocusDirective implements OnInit {
    constructor(
        private el: ElementRef,
        private renderer: Renderer2
    ) { }

    ngOnInit(): void {
        setTimeout(() => {
            this.renderer.selectRootElement(this.el.nativeElement).focus();
        }, 0);
    }
}
