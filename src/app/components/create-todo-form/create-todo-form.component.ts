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
    createTodo = new EventEmitter<{text: string, author: string, completed: boolean}>();

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