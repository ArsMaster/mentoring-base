import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogClose } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { User } from "../user-card/user-card.component";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
    selector: 'app-edit-user-dialog',
    templateUrl: './edit-user-dialog.component.html',
    styleUrl: './edit-user-dialog.component.scss',
    standalone: true,
    imports: [MatInputModule, ReactiveFormsModule, MatDialogClose, MatButtonModule],
})

export class EditUserDialogComponent {
    readonly data = inject<{ user: User }>(MAT_DIALOG_DATA);

     public form = new FormGroup({
        name: new FormControl(this.data.user.name, [Validators.required, Validators.minLength(2)]),
        username: new FormControl(this.data.user.username, [Validators.required, Validators.minLength(2)]),
        email: new FormControl(this.data.user.email, [Validators.required, Validators.email]),
        website: new FormControl(this.data.user.website, [Validators.required, Validators.minLength(3)]),
    });

    submitForm() {

    };

    get userWithUpdatedFields() {
        return {
            ...this.form.value,
            id: this.data.user.id,
        };
    };

    private _snackBar = inject(MatSnackBar);

    openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    }
    );
  };

}