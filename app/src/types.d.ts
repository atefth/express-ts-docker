export interface ITaskBase {
  id: number;
  title: string;
  updatedAt: Date;
}

export interface Task extends ITaskBase {
  description?: string;
}

export interface TaskList extends ITaskBase {
  description?: string;
  tasks: Task[];
}