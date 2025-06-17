import { AsyncPipe, NgFor } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { TodoCardComponent } from "./todo-card/todo-card.component";
import { TodosApiService } from "./todos.api-service.component"; 
import { Todo } from "./todo-card/todo-card.component";
import { TodosService } from "./todos.service";

@Component ({
    selector: 'app-todos-list',
    templateUrl: './todos-list.component.html',
    styleUrl: './todos-list.component.scss',
    standalone: true,
    imports: [NgFor, TodoCardComponent, AsyncPipe],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class TodosListComponent {
    readonly todosApiService = inject(TodosApiService);
    readonly todosService = inject(TodosService);
    todos: Todo[] = [];

    constructor() {
      this.todosApiService.getTodos().subscribe(
        (response: Todo[]) => {
          this.todos = response;
          this.todosService.setTodos(response);
        }
      )
    }

    deleteTodo(id: number): void {
      this.todos = this.todos.filter((todo: Todo) => todo.id !== id);
    }
} 