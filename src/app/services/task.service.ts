import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { AuthenticationService } from './authentication.service';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
const { API_URL } = environment;

interface DeleteTaskResponse {
  message: string;
}

@Injectable()
export class TaskService {
  private currentUser: User | null = null;

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {
    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
    });
  }

  getTasks(): void {
    if (this.currentUser) {
      const url = `${API_URL}/task/user/${this.currentUser.id}`;

      this.http.get<Task[]>(url).subscribe({
        next: (response) => {
          if (this.currentUser) {
            response.forEach((task) => {
              const newTask = new Task(task.title, task.description);
              newTask.id = task.id;
              if (task.dueDate) newTask.dueDate = task.dueDate;
              this.currentUser?.addTask(newTask);
              if (this.currentUser)
                this.authService.updateCurrentUser(this.currentUser);
            });
          }
        },
        error: (error) => {
          console.log('Error fetching tasks:', error);
        },
      });
    }
  }

  addTask(task: Task): void {
    const url = `${API_URL}/task`;
    const options = {
      headers: new HttpHeaders({
        Authorization: `${this.currentUser?.token}`,
      }),
    };

    this.http.post<Task>(url, task, options).subscribe({
      next: (response: Task) => {
        if (this.currentUser) {
          task.id = response.id;
          const newTask = new Task(response.title, response.description);
          newTask.id = response.id;
          if (response.dueDate) newTask.dueDate = response.dueDate;
          this.currentUser.addTask(newTask);
          this.authService.updateCurrentUser(this.currentUser);
        }
      },
      error: (error) => {
        console.log('Error adding task:', error);
      },
    });
  }

  editTask(task: Task): void {
    const url = `${API_URL}/task/${task.id}`;
    const options = {
      headers: new HttpHeaders({
        Authorization: `${this.currentUser?.token}`,
      }),
    };
    this.http.put<Task>(url, task, options).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log('Error updating task:', error);
      },
    });
    if (this.currentUser) {
      const index = this.currentUser.tasks.findIndex((t) => t.id === task.id);
      if (index !== -1) {
        this.currentUser.tasks[index] = task;
        this.authService.updateCurrentUser(this.currentUser);
      }
    }
  }

  deleteTask(taskId: number): void {
    const url = `${API_URL}/task/${taskId}`;
    const options = {
      headers: new HttpHeaders({
        Authorization: `${this.currentUser?.token}`,
      }),
    };
    this.http.delete<DeleteTaskResponse>(url, options).subscribe({
      next: (response) => {
        console.log(response.message);
        if (this.currentUser) {
          const index = this.currentUser.tasks.findIndex(
            (t) => t.id === taskId
          );
          if (index !== -1) {
            this.currentUser.removeTask(this.currentUser.tasks[index]);
            this.authService.updateCurrentUser(this.currentUser);
          }
        }
      },
      error: (error) => {
        console.log('Error deleting task:', error);
      },
    });
  }
}
