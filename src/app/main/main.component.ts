import { Component } from '@angular/core';
import { UserdataService } from '../services/userdata.service';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {

  private _isLogged = this.userdataService.isLogged;
  tasks: Task[] | undefined = [];
  
  constructor(
    private userdataService: UserdataService,
    private http: HttpClient
  ) {}
  
  get isLogged(): boolean {
    this.updateLoginState();
    return this._isLogged;
  }

  editTask(taskId: number) {
    console.log("Edit task with id: " + taskId);
    }
    
  ngOnInit() {
    this.updateLoginState();
    console.log(this.isLogged);
    
    if (this.isLogged) {
      const userId = this.userdataService.userData?.id;
      if (userId) {
        this.fetchTasks(userId);
      }
    }
  }

  public updateLoginState() {
    this._isLogged = this.userdataService.isLogged;
  }

  private fetchTasks(userId: number) {
    const url = `http://localhost:8080/task/user/${userId}`;

    this.http.get<Task[]>(url).subscribe({
      next: (response) => {
        this.tasks = response;
        console.log(this.tasks[0]);
      },
      error: (error) => {
        console.log('Error fetching tasks:', error);
      },
    });
  }
}
