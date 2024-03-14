import { auth } from "./auth";
import { projects } from "./projects";
import { users } from "./users";

export const useApi = ()=>({
    projects: projects,
    users: users,
    auth: auth
})

