import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import type { Task } from '../model/types';
import { TaskCard } from './TaskCard';

interface Props {
  task: Task;
  onDelete: (id: string) => void;
}

export const SortableTaskCard = ({ task, onDelete }: Props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
  id: task.id,
  transition: {
    duration: 150,
    easing: 'ease',
  },
});

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative"
    >
      {/* DRAG HANDLE ONLY */}
      <div
        {...attributes}
        {...listeners}
        className="absolute top-2 right-2 w-6 h-6 cursor-grab active:cursor-grabbing opacity-50 hover:opacity-80"
      >
        ⋮⋮
      </div>

      {/* CONTENT IS NOT DRAGGABLE */}
      <div>
        <TaskCard task={task} onDelete={onDelete} />
      </div>
    </div>
  );
};