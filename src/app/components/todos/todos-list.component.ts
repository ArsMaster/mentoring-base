import { NgFor } from "@angular/common";
import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { TodoCardComponent } from "./todo-card/todo-card.component";
import { TodosApiService } from "../user/todos.api.component"; 

export interface Todo {
    userId: number,
    id: number,
    title: string,
    completed: boolean,
}

@Component ({
    selector: 'app-todos-list',
    templateUrl: './todos-list.component.html',
    styleUrl: './todos-list.component.scss',
    standalone: true,
    imports: [NgFor, TodoCardComponent]
})

export class TodosListComponent {
    readonly todosApiService = inject(TodosApiService);
      todos: Todo[] = [];

    constructor() {
    this.todosApiService.getTodos().subscribe(
      (response: any) => {
        this.todos = response;
      }
    )
  }

  deleteTodo(id: number): void {
  this.todos = this.todos.filter((todo: Todo) => todo.id !== id);
  }
} 
