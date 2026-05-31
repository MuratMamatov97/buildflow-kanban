import {
  DndContext,
  closestCorners,
  type DragEndEvent,
  type DragStartEvent,
  DragOverlay,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useState } from 'react';

import type { Task, TaskStatus } from '@/entities/task/model/types';
import { useTaskStore } from '@/store/taskStore';
import { BoardColumn } from './BoardColumn';
import { TaskCard } from '@/entities/task/ui/TaskCard';
import { CreateTaskModal } from '@/widgets/create-task/CreateTaskModal';

export const Board = () => {
  const tasks = useTaskStore((s) => s.tasks);
  const setTasks = useTaskStore((s) => s.setTasks);
  const deleteTask = useTaskStore((s) => s.deleteTask);

  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getTaskById = (id: string) =>
    tasks.find((t) => t.id === id);

  const handleDragStart = (event: DragStartEvent) => {
    const task = getTaskById(event.active.id as string);
    if (task) setActiveTask(task);
  };

const handleDragEnd = (event: DragEndEvent) => {
  setActiveTask(null);

  const { active, over } = event;

  const activeId = active.id as string;

  const activeTask = getTaskById(activeId);
  if (!activeTask) return;

  /**
   * ❗ DROP OUTSIDE ANYTHING → RETURN
   */
  if (!over) return;

  const overId = over.id as string;

  const fromStatus = activeTask.status;

  /**
   * =========================
   * CASE 1: DROP ON COLUMN
   * =========================
   */
  const isColumnDrop =
    overId === 'backlog' ||
    overId === 'planned' ||
    overId === 'in-progress' ||
    overId === 'review' ||
    overId === 'done';

  if (isColumnDrop) {
    const toStatus = overId as TaskStatus;

    if (fromStatus === toStatus) return;

    setTasks(
      tasks.map((t) =>
        t.id === activeId
          ? { ...t, status: toStatus }
          : t
      )
    );

    return;
  }

  /**
   * =========================
   * CASE 2: DROP ON TASK (REORDER)
   * =========================
   */
  const overTask = getTaskById(overId);

  if (overTask && overTask.status === fromStatus) {
    const columnTasks = tasks.filter(
      (t) => t.status === fromStatus
    );

    const oldIndex = columnTasks.findIndex(
      (t) => t.id === activeId
    );

    const newIndex = columnTasks.findIndex(
      (t) => t.id === overId
    );

    if (oldIndex === -1 || newIndex === -1) return;

    const reordered = arrayMove(
      columnTasks,
      oldIndex,
      newIndex
    );

    const other = tasks.filter(
      (t) => t.status !== fromStatus
    );

    setTasks([...other, ...reordered]);

    return;
  }

  /**
   * =========================
   * CASE 3: INVALID DROP → RETURN
   * =========================
   */
  return;
};

  const getTasksByStatus = (status: TaskStatus) =>
    tasks.filter((t) => t.status === status);

  return (
    <>
      <div className="p-2">
        <button
          onClick={() => setIsModalOpen(true)}
          className="mb-4 bg-black text-white px-3 py-1 rounded"
        >
          + Add Task
        </button>

        <DndContext
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-6 overflow-x-auto p-6">
            <BoardColumn
              title="Backlog"
              status="backlog"
              tasks={getTasksByStatus('backlog')}
              onDelete={deleteTask}
            />

            <BoardColumn
              title="Planned"
              status="planned"
              tasks={getTasksByStatus('planned')}
              onDelete={deleteTask}
            />

            <BoardColumn
              title="In Progress"
              status="in-progress"
              tasks={getTasksByStatus('in-progress')}
              onDelete={deleteTask}
            />

            <BoardColumn
              title="Review"
              status="review"
              tasks={getTasksByStatus('review')}
              onDelete={deleteTask}
            />

            <BoardColumn
              title="Done"
              status="done"
              tasks={getTasksByStatus('done')}
              onDelete={deleteTask}
            />
          </div>

          <DragOverlay>
            {activeTask ? (
              <div className="rotate-2 scale-[1.02]">
                <TaskCard task={activeTask} />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>

      {isModalOpen && (
        <CreateTaskModal
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};