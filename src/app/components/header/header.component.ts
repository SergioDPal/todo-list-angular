import { Component } from '@angular/core';
import { UserdataService } from '../../services/userdata.service';

@Component({
  exportAs: 'ngForm',
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  hasPressedRegister = false;
  hasPressedLogin = false;
  username: string | null = null;
  private _isLogged = false;

  get isLogged(): boolean {
    this._isLogged = this.userdataService.isLogged;
    if (this._isLogged) {
      this.username = this.userdataService.userData?.username || null;
    }
    return this.userdataService.isLogged;
  }

  public updateLoginState() {
    this._isLogged = this.userdataService.isLogged;
    if (this._isLogged) {
      this.username = this.userdataService.userData?.username || null;
      this.hasPressedLogin = false;
      this.hasPressedRegister = false;
    }
  }

  constructor(private userdataService: UserdataService) {
    this.updateLoginState();
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
    this.userdataService.logout('user');
    this.updateLoginState();
  }
}
