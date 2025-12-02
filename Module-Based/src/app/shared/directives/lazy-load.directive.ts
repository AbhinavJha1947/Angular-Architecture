import { Directive, ElementRef, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Directive({
    selector: '[appLazyLoad]',
    standalone: true
})
export class LazyLoadDirective implements OnInit {
    @Input() appLazyLoad: string = '';
    @Output() loaded = new EventEmitter<void>();

    private observer?: IntersectionObserver;

    constructor(private el: ElementRef) { }

    ngOnInit(): void {
        this.createObserver();
    }

    private createObserver(): void {
        const options = {
            root: null,
            rootMargin: '50px',
            threshold: 0.01
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage();
                    this.observer?.unobserve(this.el.nativeElement);
                }
            });
        }, options);

        this.observer.observe(this.el.nativeElement);
    }

    private loadImage(): void {
        const img = this.el.nativeElement as HTMLImageElement;
        if (this.appLazyLoad && img.tagName === 'IMG') {
            img.src = this.appLazyLoad;
            img.onload = () => {
                this.loaded.emit();
            };
        }
    }

    ngOnDestroy(): void {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}
