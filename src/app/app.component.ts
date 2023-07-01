import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { CookieService } from './services/cookie.service';
import { Observable } from 'rxjs';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Angular-test';
  isLoggedIn$: Observable<boolean> = new Observable<boolean>();

  constructor(
    private authenticationService: AuthenticationService,
    private cookieService: CookieService
  ) {
    this.isLoggedIn$ = this.authenticationService.isLoggedIn$;
    this.cookieService.cookie$.subscribe((cookie) => {
      if (cookie) {
        const user = cookieService.getCookie('user');
        if (user) {
          const loggedUser = new User(user.username, user.email);
          loggedUser.id = user.id;
          loggedUser.token = user.token;
          loggedUser.email = user.email;
          this.authenticationService.updateCurrentUser(loggedUser);
        }
      }
    });
  }
}
