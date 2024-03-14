import { backEndHTTPClient } from "../../../config/http";

const resource = "/projects"

export const projects = {
    getOne: async(id:number|string)=>{
        try{
            const response = await backEndHTTPClient.get(resource+"/"+id);
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
    create:async()=>{
        try{
            const response = await backEndHTTPClient.get("");
        }catch(e){
            console.log(e);
            return null;
        }
    },
    update:async()=>{
        try{
            const response = await backEndHTTPClient.get("");
        }catch(e){
            console.log(e);
            return null;
        }
    },
    delete:async()=>{
        try{
            const response = await backEndHTTPClient.get("");
        }catch(e){
            console.log(e);
            return null;
        }
    }
}