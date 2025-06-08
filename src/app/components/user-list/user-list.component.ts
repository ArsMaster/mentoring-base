import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { UsersApiService } from './user-list.api.service';
import { UserCardComponent } from './user-card/user-card.component';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  adress: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    }
  }
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  }

}

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [NgFor, UserCardComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserComponent {
readonly apiService = inject(UsersApiService);
  users: User[] = [];

  constructor() {
    this.apiService.getUsers().subscribe(
      (response: User[]) => {
        this.users = response;
      }
    )
  }

  deleteUser(id: number): void {
    this.users = this.users.filter((user: User) => user.id !== id);
  }
}