import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
    selector: '[appLazyLoad]'
})
export class LazyLoadDirective implements OnInit {
    @Input() appLazyLoad: string = '';

    constructor(private el: ElementRef) { }

    ngOnInit(): void {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && this.appLazyLoad) {
                    const img = this.el.nativeElement as HTMLImageElement;
                    img.src = this.appLazyLoad;
                    observer.unobserve(img);
                }
            });
        });
        observer.observe(this.el.nativeElement);
    }
}
