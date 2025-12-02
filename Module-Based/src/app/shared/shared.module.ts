import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { ButtonComponent } from './components/button/button.component';
import { ModalComponent } from './components/modal/modal.component';
import { TableComponent } from './components/table/table.component';
import { PaginationComponent } from './components/pagination/pagination.component';

// Directives
import { TooltipDirective } from './directives/tooltip.directive';
import { DebounceDirective } from './directives/debounce.directive';

// Pipes
import { TruncatePipe } from './pipes/truncate.pipe';
import { HighlightPipe } from './pipes/highlight.pipe';

@NgModule({
    declarations: [
        // Components
        ButtonComponent,
        ModalComponent,
        TableComponent,
        PaginationComponent,
        // Directives
        TooltipDirective,
        DebounceDirective,
        // Pipes
        TruncatePipe,
        HighlightPipe
    ],
    imports: [
        CommonModule
    ],
    exports: [
        // Re-export CommonModule for convenience
        CommonModule,
        // Components
        ButtonComponent,
        ModalComponent,
        TableComponent,
        PaginationComponent,
        // Directives
        TooltipDirective,
        DebounceDirective,
        // Pipes
        TruncatePipe,
        HighlightPipe
    ]
})
export class SharedModule { }
