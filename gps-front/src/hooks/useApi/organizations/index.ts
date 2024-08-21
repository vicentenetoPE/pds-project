import { backEndHTTPClient } from "../../../config/http";
import { Organization } from "../../../models/models/Organization";

const resource = "/organizations/"

export const organizations = {
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
    create:async(params:Partial<Organization>)=>{
        try{
            const response = await backEndHTTPClient.post(resource, params);
            return response;
        }catch(e){
            console.log(e);
            return null;
        }
    },
    update:async(id:number|string, params:Partial<Organization>)=>{
        try{
            //tire a variavel memberCount do objeto params
            const {memberCount, members,  ...organization} = params;
            const response = await backEndHTTPClient.patch(resource+id, organization);
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