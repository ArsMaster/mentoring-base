import { Call } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Todo } from "./todo-card/todo-card.component";

@Injectable({providedIn: 'root'})
export class TodosService {
    private todosSubject$ = new BehaviorSubject<Todo[]>([]);
    todos$ = this.todosSubject$.asObservable();

    setTodos(todos: Todo[]) {
        this.todosSubject$.next(todos);
    }

    editTodo(editedTodo: Todo) {
        this.todosSubject$.next(
            this.todosSubject$.value.map(
                (todo: Todo) => todo.id === editedTodo.id ? editedTodo : todo
            )
        )
    }

    createTodo(todo: Todo) {
        const existingTodo = this.todosSubject$.value.find(
            (currentElement) => currentElement.title === todo.title
        );

        existingTodo
            ? alert('Такая задача уже существует')
            : (this.todosSubject$.next([...this.todosSubject$.value, todo]), 
              alert('Новая задача добавлена'));
    }
    
    deleteTodo(id: number) {
        this.todosSubject$.next(
            this.todosSubject$.value.filter((item: Todo) => id !== item.id)
        )
    }
}