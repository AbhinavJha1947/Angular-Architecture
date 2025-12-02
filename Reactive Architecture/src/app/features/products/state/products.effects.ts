import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as ProductActions from './products.actions';
import { ProductsService } from '../services/products.service';

@Injectable()
export class ProductsEffects {
    loadProducts$ = createEffect(() => this.actions$.pipe(
        ofType(ProductActions.loadProducts),
        mergeMap(() => this.productsService.getProducts().pipe(
            map(products => ProductActions.loadProductsSuccess({ products })),
            catchError(error => of(ProductActions.loadProductsFailure({ error })))
        ))
    ));

    constructor(
        private actions$: Actions,
        private productsService: ProductsService
    ) { }
}
