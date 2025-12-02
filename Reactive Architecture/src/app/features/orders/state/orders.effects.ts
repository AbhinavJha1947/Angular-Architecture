import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as OrderActions from './orders.actions';
import { OrdersService } from '../services/orders.service';

@Injectable()
export class OrdersEffects {
    loadOrders$ = createEffect(() => this.actions$.pipe(
        ofType(OrderActions.loadOrders),
        mergeMap(() => this.ordersService.getOrders().pipe(
            map(orders => OrderActions.loadOrdersSuccess({ orders })),
            catchError(error => of(OrderActions.loadOrdersFailure({ error })))
        ))
    ));

    constructor(
        private actions$: Actions,
        private ordersService: OrdersService
    ) { }
}
