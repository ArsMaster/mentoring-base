import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "./user-card/user-card.component";

@Injectable({providedIn: 'root'})
export class UsersApiService {
    readonly apiService = inject(HttpClient);
    users: User[] = [];

    getUsers(): Observable<User[]> {
        return this.apiService.get<User[]>('https://jsonplaceholder.typicode.com/users');
    }
}