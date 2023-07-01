import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-add-task-form',
  templateUrl: './add-task-form.component.html',
  styleUrls: ['./add-task-form.component.scss'],
})
export class AddTaskFormComponent {
  constructor(private taskService: TaskService) {}

  onSubmit(myForm: NgForm) {
    try {
      this.taskService.addTask(myForm.form.value);
    } catch (error) {
      console.error(error);
    }
  }

  onDestroy(myForm: NgForm) {
    this.clearForm(myForm);
  }

  clearForm(myForm: NgForm) {
    myForm.reset();
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}
