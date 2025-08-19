
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { UsersApiService } from '../user-list.api.service';
import { UserActions } from './user.actions';

@Injectable()
export class UserEffects {
    loadUsers$ = createEffect(() => 
        this.actions$.pipe(
            ofType(UserActions.loadUsers),
            exhaustMap(() => 
                this.usersApiService.getUsers().pipe(
                    map(users => UserActions.loadUsersSuccess({ users })),
                    catchError(error => of(UserActions.loadUsersFailure({ 
                        error: error.message || 'Failed to load users'
                    })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private usersApiService: UsersApiService
    ) {}
}