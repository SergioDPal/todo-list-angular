/* eslint-disable no-debugger */
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { UserdataService } from './userdata.service';
import { environment } from '../../environments/environment';
import { Task } from '../models/task';

const { API_URL } = environment;

interface DeleteTaskResponse {
  message: string;
}
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private userdataService: UserdataService
  ) {}

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
          this.userdataService.changeUser(data);
        },
        error: (error: HttpErrorResponse) => {
          window.alert(error?.error?.message || 'An error occurred');
        },
      });
  }

  public registerUser(username: string, email: string, password: string) {
    this.http
      .post(
        `${API_URL}/user`,
        {
          username,
          email,
          password,
        },
        { responseType: 'text' }
      )
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

  public fetchTasks(userId: number) {
    const url = `${API_URL}/task/user/${userId}`;

    this.http.get<Task[]>(url).subscribe({
      next: (response) => {
        this.userdataService.changeTasks(response);
      },
      error: (error) => {
        console.log('Error fetching tasks:', error);
      },
    });
  }

  addTask(newTask: Task) {
    const url = `${API_URL}/task`;
    const options = {
      headers: new HttpHeaders({
        Authorization: `${this.userdataService.userData?.token}`,
      }),
    };
    let responseTask;
    this.http.post<Task>(url, newTask, options).subscribe({
      next: (response) => {
        responseTask = new Task(
          response.id,
          response.title,
          response.description,
          response.dueDate,
          response.status,
          response.userId,
          response.priority
        );
        this.userdataService.addTask(responseTask);
      },
      error: (error) => {
        console.log('Error adding task:', error);
      },
    });
    return responseTask;
  }

  public deleteTask(taskId: number) {
    const url = `${API_URL}/task/${taskId}`;
    console.log(this.userdataService.userData);
    const options = {
      headers: new HttpHeaders({
        Authorization: `${this.userdataService.userData?.token}`,
      }),
    };
    this.http.delete<DeleteTaskResponse>(url, options).subscribe({
      next: (response) => {
        console.log(response.message);
        this.userdataService.removeTask(taskId);
      },
      error: (error) => {
        console.log('Error deleting task:', error);
      },
    });
  }
}
