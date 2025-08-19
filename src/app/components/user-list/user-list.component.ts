import { UserCardComponent } from './user-card/user-card.component';
import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { User } from './user-card/user-card.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserDialogComponent } from './create-user-dialog/create-user-dialog.component';
import { Store } from '@ngrx/store';
import { UserActions } from './store/user.actions';
import { selectUsers } from './store/users.selectors';

@Component({
    selector: 'app-user',
    imports: [UserCardComponent, AsyncPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './user-list.component.html',
    styleUrl: './user-list.component.scss',
    standalone: true,
})

export class UserComponent {
  readonly dialog = inject(MatDialog);
  private readonly store = inject(Store);
  public readonly users$ = this.store.select(selectUsers);
  
  constructor() {
      this.store.dispatch(UserActions.loadUsers());
    }

    deleteUser(id: number): void {
      this.store.dispatch(UserActions.delete({ id }));
    }

    editUser(user: User) {
      this.store.dispatch(UserActions.edit({ user }));
    }

    openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateUserDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((user: User | undefined) => {
      if (user) {
        this.store.dispatch(UserActions.create({ user }));
      }
    });
  }
}