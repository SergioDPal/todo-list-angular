import { Component, Input, Output } from '@angular/core';
import { Task } from 'src/app/models/task';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent {
  @Input() task: Task | undefined;
  @Output()
  openEditForm = false;
  constructor(
    private taskService: TaskService,
    private authService: AuthenticationService
  ) {
    this.authService.currentUser$.subscribe(() => {
      this.openEditForm = false;
    });
  }

  toggleEditForm() {
    this.openEditForm = !this.openEditForm;
  }

  askConfirmation() {
    if (
      confirm('Are you sure you want to delete this task?') &&
      this.task?.id
    ) {
      this.taskService.deleteTask(this.task.id);
    }
  }
}
