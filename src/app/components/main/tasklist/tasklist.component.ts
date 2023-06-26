import { Component } from '@angular/core';
import { Task } from 'src/app/models/task';
import { UserdataService } from 'src/app/services/userdata.service';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css'],
})
export class TasklistComponent {
  private _isLogged = this.userdataService.isLogged;
  public openEditForm = false;
  public openAddForm = false;
  tasks: Task[] | undefined = [];

  constructor(
    private userdataService: UserdataService,
    private apiService: ApiService
  ) {
    this.userdataService.user$.subscribe((user) => {
      if (user) {
        this.fetchTasksIfLogged();
      }
    });
    this.userdataService.tasks$.subscribe((tasks) => {
      this.updateTasksState(tasks);
    });
  }

  get isLogged(): boolean {
    this.updateLoginState();
    return this._isLogged;
  }

  askConfirmation(taskId: number) {
    if (confirm('Are you sure you want to delete task with id: ' + taskId)) {
      this.deleteTask(taskId);
    }
  }
  switchEditForm() {
    this.openEditForm = !this.openEditForm;
  }

  switchAddForm() {
    this.openAddForm = !this.openAddForm;
  }

  editTask(taskId: number) {
    console.log('Edit task with id: ' + taskId);
  }

  deleteTask(taskId: number) {
    this.apiService.deleteTask(taskId);
  }

  public fetchTasksIfLogged() {
    if (this.userdataService.isLogged) {
      if (this.userdataService.userData) {
        this.apiService.fetchTasks(this.userdataService.userData?.id);
      }
    }
  }

  public updateTasksState(tasks: Task[] | undefined) {
    this.tasks = tasks;
  }

  public updateLoginState() {
    this._isLogged = this.userdataService.isLogged;
  }
}
