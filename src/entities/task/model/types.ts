export type TaskStatus =
  | 'backlog'
  | 'planned'
  | 'in-progress'
  | 'review'
  | 'done';
  
export type TaskPriority =
  | 'low'
  | 'medium'
  | 'high';

export type Task = {
  id: string;
  title: string;
  description?: string;

  status: TaskStatus;
  priority: TaskPriority;

  assignee?: string;

  startDate?: string;
  endDate?: string;

  estimatedHours?: number;

  tags?: string[];
}