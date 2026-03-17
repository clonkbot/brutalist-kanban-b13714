export interface Task {
  id: string;
  title: string;
  columnId: string;
  priority: 'low' | 'medium' | 'high';
}

export interface Column {
  id: string;
  title: string;
  color: string;
}
