import { Component, EventEmitter, Output} from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { inject, Input } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { User } from "../user-list/user-card/user-card.component";

export interface UserFormData {
  name: string;
  username: string;
  email: string;
  website: string;
}

@Component({
    selector: 'create-user-form',
    standalone: true,
    templateUrl: './create-user-form.component.html',
    styleUrl: './create-user-form.component.scss',
    imports: [ReactiveFormsModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatCheckboxModule]
})

export class CreateUserFormComponent {
    @Input()
        user!: User;

    @Output()
    createUser = new EventEmitter<UserFormData>();

    public form = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(2)]),
        username: new FormControl('', [Validators.required, Validators.minLength(2)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        website: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });

    public submitForm(): void {
        if (this.form.valid) {
            this.createUser.emit({
                name: this.form.value.name!,
                username: this.form.value.username!,
                email: this.form.value.email!,
                website: this.form.value.website!,
            });
            this.form.reset();
        }
    }
}