import { Component } from '@angular/core';
import { Task } from 'src/app/models/task';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
  tasks: Task[] = [];

  constructor(
    private authenticationService: AuthenticationService,
    private taskService: TaskService
  ) {
    this.authenticationService.currentUser$.subscribe((user) => {
      if (user && user.tasks && user.tasks.length > 0) {
        this.tasks = user.tasks;
      } else if (user) {
        this.taskService.getTasks();
      }
    });
  }
}
