import type { Task } from '../model/types';

interface Props {
  task: Task;
  onDelete?: (id: string) => void;
}

export const TaskCard = ({ task, onDelete }: Props) => {
  return (
    <div className="bg-white rounded-lg p-3 shadow-sm border transition-all hover:shadow-md">
      <div className="flex justify-between items-start">
        <div className="font-medium text-sm">
          {task.title}
        </div>

        {onDelete && (
          <button
  onPointerDown={(e) => {
    e.stopPropagation();
  }}
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();

    onDelete?.(task.id);
  }}
  className="text-red-500 text-xs hover:text-red-700"
>
  ✕
</button>
        )}
      </div>

      <div className="text-xs text-zinc-500 mt-1">
        {task.assignee ?? 'Unassigned'}
      </div>
    </div>
  );
};