import { AsyncPipe, NgFor } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { TodoCardComponent } from "./todo-card/todo-card.component";
import { TodosApiService } from "./todos.api-service.component"; 
import { Todo } from "./todo-card/todo-card.component";
import { TodosService } from "./todos.service";
import { CreateTodoFormComponent } from "../create-todo-form/create-todo-form.component";

interface TodoFormData {
  text: string;
  completed: boolean;
}

@Component ({
    selector: 'app-todos-list',
    templateUrl: './todos-list.component.html',
    styleUrl: './todos-list.component.scss',
    standalone: true,
    imports: [NgFor, TodoCardComponent, AsyncPipe, CreateTodoFormComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class TodosListComponent {
    readonly todosService = inject(TodosService);

    constructor() {
      inject(TodosApiService).getTodos().subscribe((response: Todo[]) => {
        this.todosService.setTodos(response);
      });
    }

    deleteTodo(id: number): void {
      this.todosService.deleteTodo(id);
    }

    public createTodo(formData: TodoFormData) {
      this.todosService.createTodo({
        id: new Date().getTime(),
        title: formData.text,
        completed: formData.completed,
        userId: 1
      });
    }
} 