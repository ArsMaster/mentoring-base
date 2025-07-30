import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogClose } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { User } from "../user-card/user-card.component";
import { MatButtonModule } from "@angular/material/button";
import { NotificationService } from "../../../notification.service";

@Component({
    selector: 'app-edit-user-dialog',
    templateUrl: './edit-user-dialog.component.html',
    styleUrl: './edit-user-dialog.component.scss',
    standalone: true,
    imports: [MatInputModule, ReactiveFormsModule, MatDialogClose, MatButtonModule],
})

export class EditUserDialogComponent {
  readonly data = inject<{ user: User }>(MAT_DIALOG_DATA);
  private notificationService = inject(NotificationService);

    public form = new FormGroup({
      id: new FormControl(this.data.user.id),
      name: new FormControl(this.data.user.name, [Validators.required, Validators.minLength(2)]),
      username: new FormControl(this.data.user.username, [Validators.required, Validators.minLength(2)]),
      email: new FormControl(this.data.user.email, [Validators.required, Validators.email]),
      website: new FormControl(this.data.user.website, [Validators.required, Validators.minLength(3)]),
  });

  editUserClick(): void {
    if (this.form.valid) {
      this.notificationService.openSnackBar('Данные изменены', 'Готово');
    }
  }
}