import { useState } from 'react';
import { useTaskStore } from '@/store/taskStore';
import type { Task } from '@/entities/task/model/types';

interface Props {
  onClose: () => void;
}

export const CreateTaskModal = ({ onClose }: Props) => {
  const addTask = useTaskStore((s) => s.addTask);

  const [title, setTitle] = useState('');

  const handleSubmit = () => {
    if (!title.trim()) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      status: 'backlog',
      priority: 'medium',
      tags: [],
    };

    addTask(newTask);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-4 rounded-xl w-96">
        <h2 className="font-semibold mb-3">
          Create Task
        </h2>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded mb-3"
          placeholder="Task title"
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-black text-white px-3 py-1 rounded"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};