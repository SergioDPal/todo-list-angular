export class Task {
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  status: string;
  userId: number;
  priority: string;

  constructor(
    id: number,
    title: string,
    description: string,
    dueDate: Date,
    status: string,
    userId: number,
    priority: string
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.status = status;
    this.userId = userId;
    this.priority = priority;
  }
}
