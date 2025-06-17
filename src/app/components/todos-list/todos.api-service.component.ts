import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Todo } from "./todo-card/todo-card.component";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class TodosApiService {
    readonly apiService = inject(HttpClient);
    todos: Todo[] = [];

    getTodos(): Observable<Todo[]> {
        return this.apiService.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');
    }
}