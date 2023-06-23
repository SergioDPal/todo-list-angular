import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserdataService } from './userdata.service';
import { environment } from '../../environments/environment';

const { API_URL } = environment;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient,
    private userdataService: UserdataService
  ) { }

  public loginUser(email: string, password: string) {
    this.http
      .post(
        `${API_URL}/user/login`,
        { email, password },
        { responseType: 'text' }
      )
      .subscribe({
        next: (response) => {
          const data = JSON.parse(response);
          delete data.message;
          this.userdataService.login(data);

        },
        error: (error: HttpErrorResponse) => {
          window.alert(error?.error?.message || 'An error occurred');
        }
    });
  }

  public registerUser(username: string, email: string, password: string) {
    this.http
      .post(`${API_URL}/user`, {
        username,
        email,
        password,
      }, { responseType: 'text' })
      .subscribe({
        next: (response) => {
          const data = JSON.parse(response);
          if (data.message === 'User already exists') {
            alert('User already exists');
          } 
        },
        error: (error) => {
          console.log('Error registering user:', error);
        },
      });
  }
}
