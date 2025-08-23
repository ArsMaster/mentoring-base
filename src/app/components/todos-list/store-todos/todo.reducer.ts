import { createReducer, on } from "@ngrx/store";
import { Todo } from "../todo-card/todo-card.component";
import { TodoActions } from "./todo.actions";

export interface TodoState {
    todos: Todo[];
}

const initialState: { todos: Todo[] } = {
    todos: [],
};

export const todoReducer = createReducer(
    initialState,
    on(TodoActions.set, (state, payload): TodoState => ({
        ...state,
        todos: payload.todos,
    })),
    on(TodoActions.edit, (state, payload): TodoState => ({
        ...state,
        todos: state.todos.map((todo: Todo) => 
            todo.id === payload.todo.id ? payload.todo : todo
        ),
    })),
    on(TodoActions.create, (state, payload): TodoState => ({
        ...state,
        todos: [...state.todos, payload.todo],
    })),
    on(TodoActions.delete, (state, payload): TodoState => ({
        ...state,
    todos: state.todos.filter((todo: Todo) => todo.id !== payload.id),
    }))
);