import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule } from '@angular/forms';
import { LoginFormComponent } from './components/header/login-form/login-form.component';
import { RegisterFormComponent } from './components/header/register-form/register-form.component';
import { MainComponent } from './components/main/main.component';
import { TasklistComponent } from './components/main/tasklist/tasklist.component';
import { EditTaskFormComponent } from './components/main/tasklist/edit-task-form/edit-task-form.component';
import { AddTaskFormComponent } from './components/main/add-task-form/add-task-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginFormComponent,
    RegisterFormComponent,
    MainComponent,
    TasklistComponent,
    EditTaskFormComponent,
    AddTaskFormComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
