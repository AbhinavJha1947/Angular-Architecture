import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from './components/button/button.component';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { LazyLoadDirective } from './directives/lazy-load.directive';

@NgModule({
    declarations: [
        ButtonComponent,
        DateFormatPipe,
        FilterPipe,
        SafeHtmlPipe,
        ClickOutsideDirective,
        LazyLoadDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ButtonComponent,
        DateFormatPipe,
        FilterPipe,
        SafeHtmlPipe,
        ClickOutsideDirective,
        LazyLoadDirective
    ]
})
export class SharedModule { }
