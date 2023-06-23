import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent {
  @Input() isLogged = false;
  @Output() isLoggedChange = new EventEmitter<boolean>();

  constructor(private apiService: ApiService) {}

  onSubmit(myForm: NgForm) {
    const { username, email, password } = myForm.form.value;
    try {
      this.apiService.registerUser(username, email, password);
      this.apiService.loginUser(email, password);
    } catch (error) {
      console.error(error);
    }
    this.isLoggedChange.emit(this.isLogged);
  }

}
