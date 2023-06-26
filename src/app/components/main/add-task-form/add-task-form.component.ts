import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from 'src/app/models/task';
import { ApiService } from 'src/app/services/api.service';
import { UserdataService } from 'src/app/services/userdata.service';

@Component({
  selector: 'app-add-task-form',
  templateUrl: './add-task-form.component.html',
  styleUrls: ['./add-task-form.component.css'],
})
export class AddTaskFormComponent {
  public newTask = {} as Task;
  @Output() addTaskEvent = new EventEmitter<boolean>();

  constructor(
    private userdataService: UserdataService,
    private apiService: ApiService
  ) {
    this.userdataService.user$.subscribe((user) => {
      if (user) {
        this.newTask.userId = user.id;
      }
    });
  }

  addTask(newTaskForm: NgForm) {
    this.newTask.title = newTaskForm.form.value.title;
    this.newTask.description = newTaskForm.form.value.description;
    this.newTask.status = newTaskForm.form.value.status;
    this.newTask.dueDate = newTaskForm.form.value.dueDate;
    this.newTask.priority = newTaskForm.form.value.priority;

    try {
      this.apiService.addTask(this.newTask);
      newTaskForm.resetForm();
      this.addTaskEvent.emit(true);
    } catch (error) {
      console.log(error);
    }
  }
}
