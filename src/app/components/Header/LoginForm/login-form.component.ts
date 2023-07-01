import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  constructor(private authentication: AuthenticationService) {}

  onSubmit(myForm: NgForm) {
    const { email, password } = myForm.form.value;
    try {
      this.authentication.loginUser(email, password);
    } catch (error) {
      console.error(error);
    }
  }

  onDestroy(myForm: NgForm) {
    this.clearForm(myForm);
  }

  clearForm(myForm: NgForm) {
    myForm.reset();
  }
}
