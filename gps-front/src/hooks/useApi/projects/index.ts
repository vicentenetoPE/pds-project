import { backEndHTTPClient } from "../../../config/http";
import { Project } from "../../../models/models/Project";

const resource = "/projects/"

export const projects = {
    getOne: async(id:number|string)=>{
        try{
            const response = await backEndHTTPClient.get(resource+id);
            return response;
        }catch(e){
            console.log(e);
            return null;
        }
    },
    getAll:async()=>{
        try{
            const response = await backEndHTTPClient.get(resource);
            return response;
        }catch(e){
            console.log(e);
            return null;
        }
    },
    create:async(params:Partial<Project>)=>{
        try{
            const response = await backEndHTTPClient.post(resource, params);
            return response;
        }catch(e){
            console.log(e);
            return null;
        }
    },
    update:async(id:number|string, params:Project)=>{
        try{
            const response = await backEndHTTPClient.patch(resource+id);
            return response;
        }catch(e){
            console.log(e);
            return null;
        }
    },
    delete:async(id:number|string)=>{
        try{
            const response = await backEndHTTPClient.delete(resource+id);
            return response;
        }catch(e){
            console.log(e);
            return null;
        }
    }
}