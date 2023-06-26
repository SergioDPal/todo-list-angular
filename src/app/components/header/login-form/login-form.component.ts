import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  @Input() isLogged = false;
  @Output() isLoggedChange = new EventEmitter<boolean>();

  constructor(private apiService: ApiService) {}

  onSubmit(myForm: NgForm) {
    const { email, password } = myForm.form.value;
    try {
      this.apiService.loginUser(email, password);
      this.clearForm(myForm);
      this.isLoggedChange.emit(this.isLogged);
    } catch (error) {
      console.error(error);
    }
  }

  clearForm(myForm: NgForm) {
    myForm.reset();
  }
}
