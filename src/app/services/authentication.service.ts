import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { environment } from '../../environments/environment';
import { CookieService } from './cookie.service';
const { API_URL } = environment;

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  private currentUser: User | null = null;

  private isLoggedInSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private currentUserSubject: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);

  get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  get currentUser$(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  registerUser(username: string, password: string, email: string): void {
    this.http
      .post(
        `${API_URL}/user`,
        {
          username,
          email,
          password,
        },
        { responseType: 'text' }
      )
      .subscribe({
        next: (response) => {
          const data = JSON.parse(response);
          if (data.message === 'User already exists') {
            alert('User already exists');
          }
        },
        error: (error) => {
          console.log('Error registering user:', error);
        },
      });
  }

  loginUser(email: string, password: string): void {
    this.http
      .post(
        `${API_URL}/user/login`,
        { email, password },
        { responseType: 'text' }
      )
      .subscribe({
        next: (response) => {
          const data = JSON.parse(response);
          delete data.message;

          const loggedUser = new User(
            data.username,
            data.email,
            data.tasks,
            data.id,
            data.token
          );

          this.updateCurrentUser(loggedUser);
          this.cookieService.setCookie('user', JSON.stringify(loggedUser), 7);
          this.isLoggedInSubject.next(true);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  logoutUser(): void {
    this.isLoggedInSubject.next(false);
    this.currentUserSubject.next(null);
    this.cookieService.deleteCookie('user');
  }

  updateCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
    this.isLoggedInSubject.next(true);
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }
}
