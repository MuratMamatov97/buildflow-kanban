import { create } from 'zustand';
import type { Task } from '@/entities/task/model/types';
import { mockTasks } from '@/entities/task/model/mockTasks';
import { debounce } from '@/shared/lib/debounce';

const STORAGE_KEY = 'buildflow_tasks';

const saveToStorage = debounce((tasks: Task[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}, 300);

interface TaskStore {
  tasks: Task[];

  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  deleteTask: (taskId: string) => void;

  hydrate: () => void;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: mockTasks,

  setTasks: (tasks) => {
    set({ tasks });
    saveToStorage(tasks);
  },

  addTask: (task) => {
    const updated = [...get().tasks, task];
    set({ tasks: updated });
    saveToStorage(updated);
  },

  deleteTask: (taskId) => {
    const updated = get().tasks.filter((t) => t.id !== taskId);
    set({ tasks: updated });
    saveToStorage(updated);
  },

  hydrate: () => {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) return;

    try {
      set({ tasks: JSON.parse(raw) });
    } catch (e) {
      console.error('Hydration failed', e);
    }
  },
}));