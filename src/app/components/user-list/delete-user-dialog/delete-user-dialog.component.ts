import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { User } from '../user-card/user-card.component';
import { MatInputModule } from "@angular/material/input";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { NotificationService } from '../../../notification.service';

@Component({
  selector: 'app-delete-user-dialog',
  imports: [MatInputModule, MatDialogModule, MatButtonModule],
  templateUrl: './delete-user-dialog.component.html',
  styleUrl: './delete-user-dialog.component.scss',
  standalone: true,
})

export class DeleteUserDialogComponent {
  public readonly data = inject<{ user: User }>(MAT_DIALOG_DATA);
  private notificationService = inject(NotificationService);

  deleteUserClick(): void {
    this.notificationService.openSnackBar('Пользователь удален', 'Готово');
  };
}