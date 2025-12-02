import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
    selector: '[appTooltip]'
})
export class TooltipDirective {
    @Input('appTooltip') tooltipText = '';
    private tooltipElement?: HTMLElement;

    constructor(private el: ElementRef) { }

    @HostListener('mouseenter')
    onMouseEnter(): void {
        this.showTooltip();
    }

    @HostListener('mouseleave')
    onMouseLeave(): void {
        this.hideTooltip();
    }

    private showTooltip(): void {
        this.tooltipElement = document.createElement('div');
        this.tooltipElement.textContent = this.tooltipText;
        this.tooltipElement.className = 'custom-tooltip';
        this.tooltipElement.style.cssText = `
      position: absolute;
      background-color: #333;
      color: white;
      padding: 8px 12px;
      border-radius: 4px;
      font-size: 12px;
      z-index: 1000;
      white-space: nowrap;
    `;

        document.body.appendChild(this.tooltipElement);

        const rect = this.el.nativeElement.getBoundingClientRect();
        this.tooltipElement.style.left = rect.left + 'px';
        this.tooltipElement.style.top = (rect.bottom + 5) + 'px';
    }

    private hideTooltip(): void {
        if (this.tooltipElement) {
            document.body.removeChild(this.tooltipElement);
            this.tooltipElement = undefined;
        }
    }
}
