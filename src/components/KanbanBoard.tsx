import React, { useState } from 'react';
import { Task, Column } from './types';
import { KanbanColumn } from './KanbanColumn';

interface KanbanBoardProps {
  columns: Column[];
  tasks: Task[];
  onMoveTask: (taskId: string, newColumnId: string) => void;
  onAddTask: (columnId: string, title: string) => void;
  onDeleteTask: (taskId: string) => void;
}

export function KanbanBoard({
  columns,
  tasks,
  onMoveTask,
  onAddTask,
  onDeleteTask,
}: KanbanBoardProps) {
  const [draggedTask, setDraggedTask] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);

  const handleDragStart = (taskId: string) => {
    setDraggedTask(taskId);
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
    setDragOverColumn(null);
  };

  const handleDragOver = (columnId: string) => {
    setDragOverColumn(columnId);
  };

  const handleDrop = (columnId: string) => {
    if (draggedTask) {
      onMoveTask(draggedTask, columnId);
    }
    setDraggedTask(null);
    setDragOverColumn(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
      {columns.map((column, index) => (
        <div
          key={column.id}
          className="animate-slide-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <KanbanColumn
            column={column}
            tasks={tasks.filter(task => task.columnId === column.id)}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={() => handleDragOver(column.id)}
            onDrop={() => handleDrop(column.id)}
            onAddTask={onAddTask}
            onDeleteTask={onDeleteTask}
            isDragOver={dragOverColumn === column.id}
            draggedTaskId={draggedTask}
          />
        </div>
      ))}
    </div>
  );
}
