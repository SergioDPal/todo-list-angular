export class Task {
  id?: number;
  title: string;
  description: string;
  dueDate?: Date;

  constructor(title: string, description: string, id?: number, dueDate?: Date) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
  }
}
