import { User } from "./User";

export interface Organization {
    id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
    memberCount: number;
    members?: User[];
}