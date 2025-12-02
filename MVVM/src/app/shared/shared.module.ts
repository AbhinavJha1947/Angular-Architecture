import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ButtonComponent } from './components/button/button.component';
import { ModalComponent } from './components/modal/modal.component';
import { CardComponent } from './components/card/card.component';
import { LoaderComponent } from './components/loader/loader.component';

import { HighlightDirective } from './directives/highlight.directive.ts';
import { TooltipDirective } from './directives/tooltip.directive.ts';

import { DateFormatPipe } from './pipes/date-format.pipe';
import { CurrencyFormatPipe } from './pipes/currency-format.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';

@NgModule({
    declarations: [
        ButtonComponent,
        ModalComponent,
        CardComponent,
        LoaderComponent,
        HighlightDirective,
        TooltipDirective,
        DateFormatPipe,
        CurrencyFormatPipe,
        TruncatePipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        ButtonComponent,
        ModalComponent,
        CardComponent,
        LoaderComponent,
        HighlightDirective,
        TooltipDirective,
        DateFormatPipe,
        CurrencyFormatPipe,
        TruncatePipe
    ]
})
export class SharedModule { }
