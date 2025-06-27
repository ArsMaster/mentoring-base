import { Component, EventEmitter, Output } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
    selector: 'create-todo-form',
    templateUrl: './create-todo-form.html',
    styleUrl: './create-todo-form.scss',
    standalone: true,
    imports: [ReactiveFormsModule],
})

export class CreateTodoFormComponent {
    @Output()
    createTodo = new EventEmitter();

    public form = new FormGroup({
        text: new FormControl('', [Validators.required, Validators.minLength(2)]),
        author: new FormControl('', [Validators.required, Validators.minLength(2)]),
        completed: new FormControl('', [Validators.required, Validators.minLength(2)]),
    })

    public submitForm(): void {
        this.createTodo.emit(this.form.value);
    }
}