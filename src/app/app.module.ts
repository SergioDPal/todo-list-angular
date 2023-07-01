import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginFormComponent } from './components/Header/LoginForm/login-form.component';
import { RegisterFormComponent } from './components/Header/RegisterForm/register-form.component';
import { HeaderComponent } from './components/Header/header.component';
import { AddTaskFormComponent } from './components/Main/AddTaskForm/add-task-form.component';
import { EditTaskFormComponent } from './components/Main/TaskList/TaskCard/EditTaskForm/edit-task-form.component';
import { TaskCardComponent } from './components/Main/TaskList/TaskCard/task-card.component';
import { TaskListComponent } from './components/Main/TaskList/task-list.component';
import { MainComponent } from './components/Main/main.component';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from './services/authentication.service';
import { TaskService } from './services/task.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    LoginFormComponent,
    RegisterFormComponent,
    AddTaskFormComponent,
    TaskListComponent,
    TaskCardComponent,
    EditTaskFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent],
  providers: [AuthenticationService, TaskService],
})
export class AppModule {}
