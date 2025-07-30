import { UsersApiService } from './user-list.api.service';
import { UserCardComponent } from './user-card/user-card.component';
import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { UsersService } from './users.service';
import { User } from './user-card/user-card.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserDialogComponent } from './create-user-dialog/create-user-dialog.component';

@Component({
    selector: 'app-user',
    imports: [UserCardComponent, AsyncPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './user-list.component.html',
    styleUrl: './user-list.component.scss',
    standalone: true,
})

export class UserComponent {
  readonly usersService = inject(UsersService);
  readonly usersApiService = inject(UsersApiService);
  readonly dialog = inject(MatDialog);

  constructor() {
      this.usersApiService.getUsers().subscribe((response: User[]) => {
        this.usersService.setUsers(response);
      });
    }

    deleteUser(id: number): void {
      this.usersService.deleteUser(id);
    }

    editUser(user: User) {
      this.usersService.editUser(user)
    }

    openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateUserDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((user: User | undefined) => {
      if (user) {
        this.usersService.createUser(user);
      }
    });
  }
}