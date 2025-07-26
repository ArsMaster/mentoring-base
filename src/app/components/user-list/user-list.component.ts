import { UsersApiService } from './user-list.api.service';
import { UserCardComponent } from './user-card/user-card.component';
import { CreateUserFormComponent } from "../create-user-form/create-user-form.component";
import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { UsersService } from './users.service';
import { User } from './user-card/user-card.component';
import { UserFormData } from '../create-user-form/create-user-form.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
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
  user: any;

   constructor() {
        inject(UsersApiService).getUsers().subscribe((response: User[]) => {
          this.usersService.setUsers(response);
        });
      }
  
      deleteUser(id: number): void {
        this.usersService.deleteUser(id);
      }

      editUser(user: any) {
        this.usersService.editUser({
          ...user,
        })
      }

      @Output()
      createUser = new EventEmitter<number>();
  
      readonly dialog = inject(MatDialog);

      openCreateDialog(): void {
      const dialogRef = this.dialog.open(CreateUserDialogComponent, {
        data: { user: null },
        width: '400px',
      });

      dialogRef.afterClosed().subscribe(createResult => {
      if (createResult) {
      this.usersService.createUser({
        id: new Date().getTime(),
        ...createResult
      });
    }
    });
  }
}