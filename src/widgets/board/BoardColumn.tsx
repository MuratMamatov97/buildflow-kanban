import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import type { Task, TaskStatus } from '@/entities/task/model/types';
import { SortableTaskCard } from '@/entities/task/ui/SortableTaskCard';

interface Props {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  onDelete: (id: string) => void;
}

export const BoardColumn = ({
  title,
  status,
  tasks,
  onDelete,
}: Props) => {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  return (
    <div
      ref={setNodeRef}
      className={`rounded-xl p-4 w-80 min-h-[500px] border transition-colors ${
        isOver ? 'bg-zinc-200' : 'bg-zinc-100'
      }`}
    >
      <h2 className="font-semibold text-lg mb-4">
        {title}
      </h2>

      <SortableContext
        items={tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-3">
          {tasks.map((task) => (
            <SortableTaskCard
              key={task.id}
              task={task}
              onDelete={onDelete}
            />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};