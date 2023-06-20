import { Component } from '@angular/core';

@Component({
  exportAs: 'ngForm',
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isLogged = false;
  hasPressedRegister = false;
  hasPressedLogin = false;

  constructor() {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  toggleRegisterForm() {
    this.hasPressedRegister = !this.hasPressedRegister;
    this.hasPressedLogin = false;
  }

  toggleLoginForm() {
    this.hasPressedLogin = !this.hasPressedLogin;
    this.hasPressedRegister = false;
  }

  logout() {
    localStorage.removeItem('token');
    this.isLogged = false;
  }
}
