export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export interface TodoBody {
  title: string;
  completed?: boolean;
}
