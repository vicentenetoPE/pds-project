import { backEndHTTPClient } from "../../../config/http";
import { User } from "../../../models/models/User";

const resource = "auth/";

export const auth = {
  login: async (user: Partial<User>) => {
    try {
      const response = await backEndHTTPClient.post<LoginResponse>(resource + "signin", user);
      console.log(response);
      return response.data;
    } catch (e) {
      console.log(e);
      return null;
    }
  },

  validateToken: async (token:string) => {
    try {
      const response = await backEndHTTPClient.post<User>(resource + "validatetoken", token);
      return {...response.data, token};
    } catch (e) {
      return null;
    }
  },
};

type LoginResponse = {
  access_token: string;
};
