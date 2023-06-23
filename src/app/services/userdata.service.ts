import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { CookieService } from './cookie.services';

@Injectable({
  providedIn: 'root',
})
export class UserdataService {
  private _userData: User | null = null;

  constructor(private cookieService: CookieService) {
    const userDataCookie = this.cookieService.getCookie('user');
    if (userDataCookie) {
      this._userData = userDataCookie;
    }
  }
  get userData() {
    return this._userData;
  }

  set userData(value) {
    this._userData = value;
  }

  get isLogged() {
    return this._userData !== null;
  }

  public logout(username: string) {
    this.cookieService.deleteCookie(username);
    this._userData = null;
  }

  public login(user: User) {
    this.userData = user;
    this.cookieService.setCookie('user', JSON.stringify(user), 7);
  }
}
