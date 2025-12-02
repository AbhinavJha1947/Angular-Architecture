import { CanDeactivateFn } from '@angular/router';

export interface ComponentCanDeactivate {
    canDeactivate: () => boolean;
}

export const unsavedChangesGuard: CanDeactivateFn<ComponentCanDeactivate> = (component) => {
    if (component.canDeactivate && !component.canDeactivate()) {
        return confirm('You have unsaved changes. Do you really want to leave?');
    }
    return true;
};
