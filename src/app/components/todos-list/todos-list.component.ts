import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { TodoCardComponent } from "./todo-card/todo-card.component";
import { TodosApiService } from "./todos.api-service.component"; 
import { Todo } from "./todo-card/todo-card.component";
import { CreateTodoFormComponent } from "../create-todo-form/create-todo-form.component";
import { Store } from "@ngrx/store";
import { TodoActions } from "./store-todos/todo.actions";
import { selectTodos } from "./store-todos/todo.selectors";

interface TodoFormData {
  text: string;
  completed: boolean;
  userId: number;
}

@Component ({
    selector: 'app-todos-list',
    templateUrl: './todos-list.component.html',
    styleUrl: './todos-list.component.scss',
    imports: [TodoCardComponent, AsyncPipe, CreateTodoFormComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class TodosListComponent {
  private readonly store = inject(Store);
  public readonly todos$ = this.store.select(selectTodos);

  constructor() {
    inject(TodosApiService).getTodos().subscribe((response: Todo[]) => {
      this.store.dispatch(TodoActions.set({ todos: response }));
    });
  }

  deleteTodo(id: number): void {
    this.store.dispatch(TodoActions.delete({ id }));
  }

  public createTodo(formData: TodoFormData) {
    this.store.dispatch(TodoActions.create({ 
      todo: {
        id: new Date().getTime(),
        title: formData.text,
        completed: formData.completed,
        userId: formData.userId,
      }, 
    }));
  }
} 