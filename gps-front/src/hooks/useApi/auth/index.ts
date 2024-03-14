import { backEndHTTPClient } from "../../../config/http";
import { User } from "../../../models/models/User";


const resource = "auth/"

export const auth = {
    Login: async(user: Partial<User>)=>{
        console.log(user)
        try{
            const response = await backEndHTTPClient.post(resource+"entrar", user);
            console.log(response)
            return response;
        }catch(e){
            console.log(e);
            return null;
        }
    }
}