import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { User } from '../user-card/user-card.component';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-create-user-dialog',
  imports: [MatInputModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule],
  templateUrl: './create-user-dialog.component.html',
  styleUrl: './create-user-dialog.component.scss',
  standalone: true,
})
export class CreateUserDialogComponent {
  public readonly data = inject<{ user: User | null }>(MAT_DIALOG_DATA, { optional: true });

  private readonly dialogRef = inject(MatDialogRef<CreateUserDialogComponent>);

  public form = new FormGroup({
    name: new FormControl(this.data?.user?.name ?? '', [Validators.required, Validators.minLength(2)]),
    username: new FormControl(this.data?.user?.username ?? '', [Validators.required, Validators.minLength(2)]),
    email: new FormControl(this.data?.user?.email ?? '', [Validators.required, Validators.email]),
    website: new FormControl(this.data?.user?.website ?? '', [Validators.required, Validators.minLength(3)]),
  });

  submitForm() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
      verticalPosition:'top',
      horizontalPosition: 'center',
    }
    );
  };
}