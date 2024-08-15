export class CreateTaskDto {
    id?: number;
  
    name: string;
  
    description?: string;
  
    status: string;
  
    priority?: number;
  
    estimatedTime?: number;
  
    loggedTime?: number;
  
    createdAt?: Date;
  
    projectId: number;
  
    createdById: number;
  
    assigneeIds: number[];
  
    sprintId?: number;
  
    releaseId?: number;
  }
  