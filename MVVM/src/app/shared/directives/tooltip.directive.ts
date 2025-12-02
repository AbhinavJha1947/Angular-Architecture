import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
    selector: '[appTooltip]'
})
export class TooltipDirective implements OnInit {
    @Input('appTooltip') tooltipText: string = '';

    constructor(private el: ElementRef) { }

    ngOnInit() {
        this.el.nativeElement.title = this.tooltipText;
    }
}
