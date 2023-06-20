import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  @Input() isLogged = false;
  @Output() isLoggedChange = new EventEmitter<boolean>();

  async onSubmit(myForm: NgForm) {
    const { email, password } = myForm.form.value;
    const res = await fetch('http://localhost:8080/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (res.status === 200) {
      localStorage.setItem('token', data.token);
      this.isLogged = true;
      this.isLoggedChange.emit(this.isLogged);
    }
  }
}
