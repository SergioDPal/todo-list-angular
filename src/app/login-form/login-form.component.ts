import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserdataService } from '../services/userdata.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  @Input() isLogged = false;
  @Output() isLoggedChange = new EventEmitter<boolean>();

  constructor(private userdataService: UserdataService) {}

  async onSubmit(myForm: NgForm) {
    const { email, password } = myForm.form.value;
    const response = await fetch('http://localhost:8080/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      delete data.message;
      this.userdataService.userData = data;
      this.clearForm(myForm);
    } else {
      const errorData = await response.json();
      window.alert(errorData.message);
    }

    this.isLoggedChange.emit(this.isLogged);
  }

  public clearForm(myForm: NgForm) {
    myForm.reset();
  }
}
