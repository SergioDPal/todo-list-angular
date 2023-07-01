import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-edit-task-form',
  templateUrl: './edit-task-form.component.html',
  styleUrls: ['./edit-task-form.component.scss'],
})
export class EditTaskFormComponent {
  @Input()
  public task: Task | undefined;

  constructor(private taskService: TaskService) {}

  public onSubmit(editForm: NgForm) {
    if (this.task) {
      this.task.title = editForm.form.value.title;
      this.task.description = editForm.form.value.description;
      this.task.dueDate = editForm.form.value.dueDate;
      this.taskService.editTask(this.task);
    }
  }
}
