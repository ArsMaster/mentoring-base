import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Todo } from "../todo-card/todo-card.component";

export const TodoActions = createActionGroup({
    source: 'Todos',
    events: {
        'set': props<{ todos: Todo[] }>(),
        'edit': props<{ todo: Todo }>(),
        'create': props<{ todo: Todo }>(),
        'delete': props<{ id: number }>(),

        'Load Todos': emptyProps(),
        'Load Todos Success': props<{ todos: Todo[] }>(),
        'Load Todos Failure': props<{ error: string }>(),
    },
});