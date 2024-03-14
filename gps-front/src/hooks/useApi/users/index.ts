import { backEndHTTPClient } from "../../../config/http";
import { User } from "../../../models/models/User";

const resource = "/users/"

export const users = {
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
    create:async(params:Partial<User>)=>{
        try{
            const response = await backEndHTTPClient.post(resource, params);
            return response;
        }catch(e){
            console.log(e);
            return null;
        }
    },
    update:async(id:number|string, params:User)=>{
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