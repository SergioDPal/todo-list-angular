import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent {
  constructor(private authentication: AuthenticationService) {}

  onSubmit(myForm: NgForm) {
    const { email, password, username } = myForm.form.value;
    try {
      this.authentication.registerUser(username, password, email);
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
