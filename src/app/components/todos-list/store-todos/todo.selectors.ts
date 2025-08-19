import { createSelector } from "@ngrx/store";
import { Todo } from "../todo-card/todo-card.component";

interface TodoState {
    todos: Todo[];
}

interface AppState {
    todos: TodoState;
}

export const selectTodosFeature = (state: AppState) => state.todos;

export const selectTodos = createSelector(
    selectTodosFeature,
    (state: TodoState) => state.todos
);