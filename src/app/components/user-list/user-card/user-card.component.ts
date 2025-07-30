import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { EditUserDialogComponent } from "../edit-user-dialog/edit-user-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { DeleteUserDialogComponent } from "../delete-user-dialog/delete-user-dialog.component";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  website: string;
}

@Component ({
    selector: 'app-user-card',
    templateUrl: './user-card.component.html',
    styleUrl: './user-card.component.scss',
    standalone: true,
    imports: [MatDialogModule],
})

export class UserCardComponent {
    @Input()
    user!: User;

    @Output()
    deleteUser = new EventEmitter<number>();

    @Output()
    editUser = new EventEmitter<User>();

    readonly dialog = inject(MatDialog);

      openDeleteDialog(): void {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      data: { user: this.user },
    });

    dialogRef.afterClosed().subscribe((result: boolean | undefined) => {
      if (result) {
        this.deleteUser.emit(this.user.id)
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      data: { user: this.user },
    });

    dialogRef.afterClosed().subscribe(editResult => {
      if (editResult) {
        this.editUser.emit(editResult);
      }
    });
  }
}