export interface Task {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  description?: string;
  createdAt?: string;
}

export interface TaskFilters {
  search: string;
  status: "all" | "completed" | "pending";
  sortBy: "newest" | "oldest" | "title";
}
