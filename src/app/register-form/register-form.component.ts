import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent {
  @Input() isLogged = false;
  @Output() isLoggedChange = new EventEmitter<boolean>();

  async onSubmit(myForm: NgForm) {
    const { username, email, password } = myForm.form.value;
    const res = await fetch('http://localhost:8080/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await res.json();

    if (data.message === 'User already exists') {
      alert('User already exists');
    } else {
      if (res.status === 200) {
        const loginRes = await fetch('http://localhost:8080/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
        const str = await loginRes.json();

        if (loginRes.status === 200) {
          localStorage.setItem('token', str.token);
          this.isLogged = true;
          this.isLoggedChange.emit(this.isLogged);
        }
      }
    }
  }
}
