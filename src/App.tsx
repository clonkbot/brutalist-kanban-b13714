import React, { useState, useCallback } from 'react';
import { KanbanBoard } from './components/KanbanBoard';
import { Task, Column } from './components/types';

const initialColumns: Column[] = [
  { id: 'backlog', title: 'BACKLOG', color: '#6B7280' },
  { id: 'in-progress', title: 'IN PROGRESS', color: '#F59E0B' },
  { id: 'review', title: 'REVIEW', color: '#8B5CF6' },
  { id: 'done', title: 'DONE', color: '#10B981' },
];

const initialTasks: Task[] = [
  { id: '1', title: 'DEMOLISH OLD SYSTEM', columnId: 'backlog', priority: 'high' },
  { id: '2', title: 'POUR FOUNDATION', columnId: 'backlog', priority: 'medium' },
  { id: '3', title: 'INSTALL FRAMEWORK', columnId: 'in-progress', priority: 'high' },
  { id: '4', title: 'RUN ELECTRICAL', columnId: 'in-progress', priority: 'low' },
  { id: '5', title: 'INSPECT STRUCTURE', columnId: 'review', priority: 'medium' },
  { id: '6', title: 'APPROVED PERMITS', columnId: 'done', priority: 'high' },
];

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [columns] = useState<Column[]>(initialColumns);

  const moveTask = useCallback((taskId: string, newColumnId: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, columnId: newColumnId } : task
      )
    );
  }, []);

  const addTask = useCallback((columnId: string, title: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: title.toUpperCase(),
      columnId,
      priority: 'medium',
    };
    setTasks(prev => [...prev, newTask]);
  }, []);

  const deleteTask = useCallback((taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white relative overflow-hidden">
      {/* Noise texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Warning stripe header */}
      <div className="h-3 md:h-4 w-full bg-repeat-x" style={{
        backgroundImage: `repeating-linear-gradient(
          -45deg,
          #F59E0B,
          #F59E0B 10px,
          #1a1a1a 10px,
          #1a1a1a 20px
        )`
      }} />

      {/* Header */}
      <header className="border-b-4 border-white px-3 py-4 md:px-8 md:py-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-[-0.05em] leading-none">
              <span className="inline-block border-4 border-white px-2 py-1 md:px-3 md:py-1 bg-white text-black mr-2 md:mr-3 -rotate-1">
                KANBAN
              </span>
              <span className="inline-block -ml-1 md:-ml-2 rotate-1 text-[#F59E0B]">BOARD</span>
            </h1>
            <p className="mt-2 md:mt-3 text-[10px] md:text-xs tracking-[0.3em] text-gray-500 font-mono">
              TASK MANAGEMENT SYSTEM // REV.2024
            </p>
          </div>
          <div className="text-right font-mono text-[10px] md:text-xs text-gray-500">
            <div>TASKS: {tasks.length}</div>
            <div>ACTIVE: {tasks.filter(t => t.columnId === 'in-progress').length}</div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="px-2 py-4 md:p-6 lg:p-8">
        <KanbanBoard
          columns={columns}
          tasks={tasks}
          onMoveTask={moveTask}
          onAddTask={addTask}
          onDeleteTask={deleteTask}
        />
      </main>

      {/* Footer warning stripe */}
      <div className="h-3 md:h-4 w-full bg-repeat-x mt-8" style={{
        backgroundImage: `repeating-linear-gradient(
          45deg,
          #EF4444,
          #EF4444 10px,
          #1a1a1a 10px,
          #1a1a1a 20px
        )`
      }} />

      {/* Footer */}
      <footer className="border-t-4 border-white px-3 py-3 md:px-8 md:py-4 text-center">
        <p className="text-[10px] md:text-xs font-mono text-gray-600 tracking-wide">
          Requested by @web-user · Built by @clonkbot
        </p>
      </footer>
    </div>
  );
}
