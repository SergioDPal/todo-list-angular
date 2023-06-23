import { Task } from './task';

describe('Task', () => {
  it('should create an instance', () => {
    const task = new Task(1, 'Task 1', 'Description of Task 1', new Date(), 'in progress', 1, 'high');
    expect(task).toBeTruthy();
  });
});
