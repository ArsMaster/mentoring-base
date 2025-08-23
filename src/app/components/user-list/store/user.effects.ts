
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { UsersApiService } from '../user-list.api.service';
import { UserActions } from './user.actions';
import { User } from '../user-card/user-card.component';

@Injectable()
export class UserEffects {
    private actions$ = inject(Actions);
    private usersApiService = inject(UsersApiService);
    
    loadUsers$ = createEffect(() => 
        this.actions$.pipe(
            ofType(UserActions.loadUsers),
            exhaustMap(() => 
                this.usersApiService.getUsers().pipe(
                    map((users: User[]) => UserActions.loadUsersSuccess({ users })),
                    catchError((error: Error) => of(UserActions.loadUsersFailure({ 
                        error: error.message || 'Failed to load users'
                    })))
                )
            )
        )
    );
}