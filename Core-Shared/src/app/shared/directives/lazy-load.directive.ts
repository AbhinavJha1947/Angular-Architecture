import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[appLazyLoad]',
    standalone: true
})
export class LazyLoadDirective {
    @Input() appLazyLoad: string = '';

    constructor(private el: ElementRef) { }

    @HostListener('intersectionObserver')
    loadImage(): void {
        const img = this.el.nativeElement as HTMLImageElement;
        if (this.appLazyLoad) {
            img.src = this.appLazyLoad;
        }
    }

    ngAfterViewInit(): void {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage();
                    observer.unobserve(this.el.nativeElement);
                }
            });
        });

        observer.observe(this.el.nativeElement);
    }
}
