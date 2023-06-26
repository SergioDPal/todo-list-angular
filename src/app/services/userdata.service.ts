import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { CookieService } from './cookie.services';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class UserdataService {
  private _userData: User | null = null;

  private userSource = new BehaviorSubject<User | null>(null);
  user$ = this.userSource.asObservable();

  private tasksSource = new BehaviorSubject<Task[]>(
    this._userData?.tasks || []
  );
  tasks$ = this.tasksSource.asObservable();

  constructor(private cookieService: CookieService) {
    const userDataCookie = this.cookieService.getCookie('user');
    if (userDataCookie) {
      this._userData = new User(
        userDataCookie.id,
        userDataCookie.username,
        userDataCookie.email,
        userDataCookie.token
      );
      this._userData.setTasks(userDataCookie.tasks);
      this.userSource.next(this._userData);
    }
  }

  changeUser(user: User) {
    this._userData = user;
    this.userSource.next(user);
  }

  changeTasks(tasks: Task[]) {
    this.tasksSource.next(tasks);
    if (this._userData) {
      this._userData.tasks = tasks;
    }
  }

  get userData() {
    return this._userData;
  }

  set userData(value) {
    this._userData = value;
  }

  get isLogged() {
    return this._userData !== null;
  }

  public logout(username: string) {
    this.cookieService.deleteCookie(username);
    this._userData = null;
  }

  public login(user: User) {
    this.userData = user;
    this.cookieService.setCookie('user', JSON.stringify(user), 7);
  }

  public addTask(task: Task) {
    try {
      if (this._userData !== null) {
        this._userData.addTask(task);
        this.changeTasks(this._userData.getTasks());
      }
    } catch (e) {
      console.log(e);
    }
  }

  removeTask(taskId: number) {
    if (this._userData !== null) {
      const task = this._userData.getTask(taskId);
      if (task) {
        this._userData.removeTask(task);
      }
    }
  }
}
