import { auth } from "./auth";
import { projects } from "./projects";
import { tasks } from "./tasks";
import { users } from "./users";

export const useApi = ()=>({
    projects: projects,
    users: users,
    auth: auth,
    tasks: tasks
})

