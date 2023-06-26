import { Task } from './task';

export class User {
  id: number;
  username: string;
  email: string;
  token: string;
  tasks: Task[] = [];

  constructor(id: number, username: string, email: string, token: string) {
    this.token = token;
    this.id = id;
    this.username = username;
    this.email = email;
  }

  public addTask(task: Task) {
    this.tasks = [...this.tasks, task];
  }

  public setTasks(tasks: Task[]) {
    this.tasks = tasks;
  }

  public removeTask(task: Task) {
    const index = this.tasks.indexOf(task);
    this.tasks.splice(index, 1);
  }

  public getTasks() {
    return this.tasks;
  }

  public getTask(id: number) {
    if (!this.tasks) {
      return null;
    }
    return this.tasks.find((task) => task.id === id);
  }
}
