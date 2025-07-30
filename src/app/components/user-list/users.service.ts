import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { User } from "./user-card/user-card.component";

@Injectable({providedIn: 'root'})
export class UsersService {
    private usersSubject$ = new BehaviorSubject<User[]>([]);
    users$ = this.usersSubject$.asObservable();

    setUsers(users: User[]) {
        this.usersSubject$.next(users);
    }

    editUser(editedUser: User) {
        this.usersSubject$.next(
            this.usersSubject$.value.map(
                (user: User) => user.id === editedUser.id ? editedUser : user
            )
        )
    }

    createUser(user: User) {
        const existingUser = this.usersSubject$.value.find(
            (currentElement: User) => currentElement.name === user.name
        );

        existingUser
            if (existingUser) {
            alert('Такой пользователь уже существует');
        } else {
            this.usersSubject$.next([...this.usersSubject$.value, user]);
        }
    }
    
    deleteUser(id: number) {
        this.usersSubject$.next(
            this.usersSubject$.value.filter((item: User) => id !== item.id)
        )
    }
}