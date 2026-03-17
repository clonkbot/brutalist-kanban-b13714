import React, { useState } from 'react';
import { Task, Column } from './types';
import { TaskCard } from './TaskCard';

interface KanbanColumnProps {
  column: Column;
  tasks: Task[];
  onDragStart: (taskId: string) => void;
  onDragEnd: () => void;
  onDragOver: () => void;
  onDrop: () => void;
  onAddTask: (columnId: string, title: string) => void;
  onDeleteTask: (taskId: string) => void;
  isDragOver: boolean;
  draggedTaskId: string | null;
}

export function KanbanColumn({
  column,
  tasks,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
  onAddTask,
  onDeleteTask,
  isDragOver,
  draggedTaskId,
}: KanbanColumnProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      onAddTask(column.id, newTaskTitle.trim());
      setNewTaskTitle('');
      setIsAdding(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    onDragOver();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    onDrop();
  };

  return (
    <div
      className={`
        border-4 border-white bg-[#0d0d0d] transition-all duration-150
        ${isDragOver ? 'border-[#F59E0B] translate-x-1 -translate-y-1 shadow-brutal-yellow' : ''}
      `}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {/* Column header */}
      <div
        className="border-b-4 border-white px-3 py-2 md:px-4 md:py-3 flex items-center justify-between"
        style={{ backgroundColor: column.color }}
      >
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-2 h-2 md:w-3 md:h-3 bg-black rotate-45" />
          <h2 className="text-sm md:text-lg font-black tracking-tight text-black truncate">
            {column.title}
          </h2>
        </div>
        <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
          <span className="text-xs md:text-sm font-mono font-bold text-black bg-white px-1.5 py-0.5 md:px-2 md:py-1 border-2 border-black">
            {tasks.length}
          </span>
        </div>
      </div>

      {/* Tasks container */}
      <div className="p-2 md:p-3 space-y-2 md:space-y-3 min-h-[120px] md:min-h-[200px]">
        {tasks.map((task, index) => (
          <TaskCard
            key={task.id}
            task={task}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDelete={onDeleteTask}
            isDragging={draggedTaskId === task.id}
            index={index}
          />
        ))}

        {/* Add task form */}
        {isAdding ? (
          <form onSubmit={handleSubmit} className="space-y-2">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="TASK NAME..."
              autoFocus
              className="w-full bg-[#2a2a2a] border-3 border-white px-2 py-2 md:px-3 md:py-2 font-mono text-xs md:text-sm uppercase tracking-wide placeholder:text-gray-600 focus:outline-none focus:border-[#F59E0B] transition-colors"
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-white text-black font-black text-xs md:text-sm py-2 md:py-2 border-3 border-white hover:bg-[#F59E0B] hover:border-[#F59E0B] transition-colors active:translate-y-0.5"
              >
                ADD
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsAdding(false);
                  setNewTaskTitle('');
                }}
                className="flex-1 bg-transparent text-white font-black text-xs md:text-sm py-2 md:py-2 border-3 border-white hover:bg-[#EF4444] hover:border-[#EF4444] transition-colors active:translate-y-0.5"
              >
                CANCEL
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="w-full border-3 border-dashed border-gray-600 px-2 py-3 md:px-3 md:py-4 font-mono text-xs md:text-sm text-gray-500 hover:border-white hover:text-white transition-all group"
          >
            <span className="inline-block group-hover:rotate-90 transition-transform mr-2">+</span>
            NEW TASK
          </button>
        )}
      </div>
    </div>
  );
}
