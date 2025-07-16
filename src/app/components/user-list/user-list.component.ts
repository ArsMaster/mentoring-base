import { UsersApiService } from './user-list.api.service';
import { UserCardComponent } from './user-card/user-card.component';
import { CreateUserFormComponent } from "../create-user-form/create-user-form.component";
import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { UsersService } from './users.service';
import { User } from './user-card/user-card.component';
import { UserFormData } from '../create-user-form/create-user-form.component';

@Component({
    selector: 'app-user',
    imports: [UserCardComponent, CreateUserFormComponent, AsyncPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './user-list.component.html',
    styleUrl: './user-list.component.scss'
})

export class UserComponent {
readonly usersService = inject(UsersService);

   constructor() {
        inject(UsersApiService).getUsers().subscribe((response: User[]) => {
          this.usersService.setUsers(response);
        });
      }
  
      deleteUser(id: number): void {
        this.usersService.deleteUser(id);
      }
  
      public createUser(formData: UserFormData) {
        this.usersService.createUser({
          id: new Date().getTime(),
          name: formData.name,
          username: formData.username,
          website: formData.website,
          email: formData.email,
        });
      }
}