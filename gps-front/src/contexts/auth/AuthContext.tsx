import { createContext } from "react";
import { User } from "../../models/user";

type AuthContextType = {
  token: string | null;
  signin: (email: string, password: string) => Promise<boolean>;
  signout: () => void;
};

export const AuthContext = createContext({} as AuthContextType);
