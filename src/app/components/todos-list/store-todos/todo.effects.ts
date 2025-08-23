
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { TodosApiService } from '../todos.api-service.component';
import { TodoActions } from './todo.actions';
import { Todo } from '../todo-card/todo-card.component';

@Injectable()
export class TodoEffects {
    private actions$ = inject(Actions);
    private todosApiService = inject(TodosApiService);
    
    loadTodos$ = createEffect(() => 
        this.actions$.pipe(
            ofType(TodoActions.loadTodos),
            exhaustMap(() => 
                this.todosApiService.getTodos().pipe(
                    map((todos: Todo[]) => TodoActions.loadTodosSuccess({ todos })),
                    catchError((error: Error) => of(TodoActions.loadTodosFailure({ 
                        error: error.message || 'Failed to load users'
                    })))
                )
            )
        )
    );
}