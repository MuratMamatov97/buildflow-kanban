import type { Task } from './types';

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Prepare construction timeline',
    description: 'Create initial project schedule',
    status: 'backlog',
    priority: 'high',
    assignee: 'Alex',
    estimatedHours: 12,
    tags: ['planning'],
  },
  {
    id: '2',
    title: 'Review material delivery',
    status: 'planned',
    priority: 'medium',
    assignee: 'John',
    estimatedHours: 4,
    tags: ['logistics'],
  },
  {
    id: '3',
    title: 'Foundation inspection',
    status: 'in-progress',
    priority: 'high',
    assignee: 'Kate',
    estimatedHours: 6,
    tags: ['inspection'],
  },
];