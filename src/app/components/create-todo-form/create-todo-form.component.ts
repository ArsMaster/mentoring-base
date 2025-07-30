import { Component, EventEmitter, Output } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';

interface TodoFormData {
  text: string;
  author: string;
  completed: boolean;
  userId: number;
}

@Component({
    selector: 'create-todo-form',
    standalone: true,
    templateUrl: './create-todo-form.html',
    styleUrl: './create-todo-form.scss',
    imports: [ReactiveFormsModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatCheckboxModule]
})

export class CreateTodoFormComponent {
    @Output()
    createTodo = new EventEmitter<TodoFormData>();

    public form = new FormGroup({
        text: new FormControl('', [Validators.required, Validators.minLength(2)]),
        author: new FormControl('', [Validators.required, Validators.minLength(2)]),
        completed: new FormControl(false),
        userId: new FormControl(1, [Validators.required]),
    })

    public submitForm(): void {
        if (this.form.valid) {
            this.createTodo.emit({
                text: this.form.value.text!,
                author: this.form.value.author!,
                completed: this.form.value.completed!,
                userId: this.form.value.userId!,
            });
            this.form.reset();
        }
    }
}