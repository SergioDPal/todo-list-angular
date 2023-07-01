import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isLoggedIn$: Observable<boolean>;
  currentUser$: Observable<User | null>;
  username: string | null = null;
  showLogin = false;
  showRegister = false;

  constructor(private authenticationService: AuthenticationService) {
    this.isLoggedIn$ = this.authenticationService.isLoggedIn$;
    this.currentUser$ = this.authenticationService.currentUser$;
    this.currentUser$.subscribe((user) => {
      if (user) {
        this.username = user.username;
      } else {
        this.username = null;
      }
    });
  }

  toggleLoginForm() {
    this.showRegister = false;
    this.showLogin = !this.showLogin;
  }

  toggleRegisterForm() {
    this.showLogin = false;
    this.showRegister = !this.showRegister;
  }

  logout() {
    this.authenticationService.logoutUser();
    this.showLogin = false;
    this.showRegister = false;
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}
