import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface IUser {
  name: string,
  email: string,
  isAdmin: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private readonly userSubject$ = new BehaviorSubject<IUser | null>(null)
  public readonly user$ = this.userSubject$.asObservable()

  private user: IUser = {
    name: 'Arsen',
    email: 'g.arsen90@gmail.com',
    isAdmin: false,
  }

  loginAsAdmin(): void {
    this.userSubject$.next({ ...this.user, isAdmin: true })
  }

  loginAsUser(): void {
    this.userSubject$.next({ ...this.user, isAdmin: false })
  }

  get isAdmin(): boolean | undefined {
    return this.userSubject$.value?.isAdmin
  }

  logout(): void {
    this.userSubject$.next(null)
  } 
}