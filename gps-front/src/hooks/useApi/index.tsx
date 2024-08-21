import { auth } from "./auth";
import { organizations } from "./organizations";
import { projects } from "./projects";
import { tasks } from "./tasks";
import { users } from "./users";

export const useApi = ()=>({
    projects: projects,
    users: users,
    auth: auth,
    tasks: tasks,
    organizations: organizations
})

