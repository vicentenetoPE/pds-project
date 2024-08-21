export interface Task {
  id: number;
  name: string;
  description?: string;
  status: TaskStatus;
  priority?: number;
  estimatedTime?: number;
  loggedTime?: number;
  sprintId?: number;
  releaseId?: number;
  assigneeIds: number[];
  createdAt: string;
  projectId: number;
  project: {
    id: number;
  };
}

export type TaskStatus = "backlog" | "ready" | "doing" | "review" | "done";
