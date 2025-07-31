import { Component, EventEmitter, Input, Output } from "@angular/core";
import { TruncatePipe } from "../../../truncate.pipe";

export interface Todo {
    userId: number,
    id: number,
    title: string,
    completed: boolean,
}

@Component ({
    selector: 'app-todo-card',
    templateUrl: './todo-card.component.html',
    styleUrl: './todo-card.component.scss',
    imports: [TruncatePipe],
})

export class TodoCardComponent {
    @Input()
    todo!: Todo;

    @Output()
    deleteTodo = new EventEmitter<number>();

    onDeleteTodo(todoId: number) {
         this.deleteTodo.emit(todoId)
    }   
}