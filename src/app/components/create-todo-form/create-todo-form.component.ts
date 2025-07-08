import { Component, EventEmitter, Output } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

interface TodoFormData {
  text: string;
  author: string;
  completed: boolean;
}

@Component({
    selector: 'create-todo-form',
    templateUrl: './create-todo-form.html',
    styleUrl: './create-todo-form.scss',
    imports: [ReactiveFormsModule]
})

export class CreateTodoFormComponent {
    @Output()
    createTodo = new EventEmitter<TodoFormData>();

    public form = new FormGroup({
        text: new FormControl('', [Validators.required, Validators.minLength(2)]),
        author: new FormControl('', [Validators.required, Validators.minLength(2)]),
        completed: new FormControl(false, [Validators.required]),
    })

    public submitForm(): void {
        if (this.form.valid) {
            this.createTodo.emit({
                text: this.form.value.text!,
                author: this.form.value.author!,
                completed: this.form.value.completed!
            });
            this.form.reset();
        }
    }
}