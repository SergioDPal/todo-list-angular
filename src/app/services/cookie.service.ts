import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  private cookie = '';

  constructor() {
    this.cookie = document.cookie;
    this.cookieSource.next(this.cookie);
  }
  private cookieSource = new BehaviorSubject<string>(this.cookie);
  cookie$ = this.cookieSource.asObservable();

  deleteCookie(name: string) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  setCookie(name: string, value: string, days: number) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
  }

  getCookie(name: string) {
    const cookieValue = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${name}=`))
      ?.split('=')[1];

    if (cookieValue) {
      const decodedValue = decodeURIComponent(cookieValue);
      return JSON.parse(decodedValue);
    }
  }
}
