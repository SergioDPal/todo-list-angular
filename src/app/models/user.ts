import { Task } from './task';

export class User {
  constructor(
    public username: string,
    public email: string,
    public tasks: Task[] = [],
    public id?: number,
    public token?: string
  ) {}

  addTask(task: Task): void {
    this.tasks.push(task);
  }

  removeTask(task: Task): void {
    const index = this.tasks.indexOf(task);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  }
}
