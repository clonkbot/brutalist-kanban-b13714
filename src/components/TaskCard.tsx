import React from 'react';
import { Task } from './types';

interface TaskCardProps {
  task: Task;
  onDragStart: (taskId: string) => void;
  onDragEnd: () => void;
  onDelete: (taskId: string) => void;
  isDragging: boolean;
  index: number;
}

const priorityConfig = {
  high: { color: '#EF4444', label: 'HIGH', symbol: '!!!' },
  medium: { color: '#F59E0B', label: 'MED', symbol: '!!' },
  low: { color: '#6B7280', label: 'LOW', symbol: '!' },
};

export function TaskCard({
  task,
  onDragStart,
  onDragEnd,
  onDelete,
  isDragging,
  index,
}: TaskCardProps) {
  const priority = priorityConfig[task.priority];

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.effectAllowed = 'move';
    onDragStart(task.id);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
      className={`
        group relative bg-[#1a1a1a] border-3 border-white cursor-grab active:cursor-grabbing
        transition-all duration-150 animate-card-in
        ${isDragging ? 'opacity-50 rotate-2 scale-95' : 'hover:-translate-y-0.5 hover:translate-x-0.5 hover:shadow-brutal'}
      `}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Punch holes decoration */}
      <div className="absolute left-1 md:left-2 top-0 bottom-0 flex flex-col justify-center gap-1 md:gap-2">
        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#0d0d0d] border border-gray-700" />
        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#0d0d0d] border border-gray-700" />
        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#0d0d0d] border border-gray-700" />
      </div>

      <div className="pl-5 pr-2 py-2 md:pl-8 md:pr-3 md:py-3">
        {/* Priority indicator */}
        <div className="flex items-center justify-between mb-1.5 md:mb-2">
          <div
            className="flex items-center gap-1 md:gap-2 px-1.5 py-0.5 md:px-2 md:py-1 text-[9px] md:text-[10px] font-mono font-bold border-2"
            style={{
              borderColor: priority.color,
              color: priority.color,
            }}
          >
            <span>{priority.symbol}</span>
            <span>{priority.label}</span>
          </div>
          <span className="text-[8px] md:text-[10px] font-mono text-gray-600">
            #{task.id.padStart(4, '0')}
          </span>
        </div>

        {/* Task title */}
        <p className="font-mono text-xs md:text-sm font-bold tracking-tight leading-tight pr-4 md:pr-6 break-words">
          {task.title}
        </p>

        {/* Delete button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task.id);
          }}
          className="absolute top-2 right-2 w-5 h-5 md:w-6 md:h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-[#EF4444] text-white text-xs md:text-sm font-black border-2 border-white hover:scale-110 active:scale-95"
          aria-label="Delete task"
        >
          X
        </button>
      </div>

      {/* Bottom perforation line */}
      <div className="absolute bottom-0 left-5 md:left-8 right-2 md:right-3 border-t border-dashed border-gray-700" />
    </div>
  );
}
