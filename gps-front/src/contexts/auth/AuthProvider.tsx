import { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { AuthContext } from "./AuthContext";
import { User } from "../../models/user";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [token, setToken] = useState<string | null>(null);
  const api = useApi();

  useEffect(() => {
    const validateToken = async () => {
      const storageData = localStorage.getItem('access_token');
      if (storageData) {
           const data = await api.auth.validateToken(storageData);
          if (data) {
              setToken(data.token);
          }
      }
    };
    validateToken();
  }, [api]);

  const signin = async (email: string, password: string) => {
    const data = await api.auth.login({ email, password });
    if (data.access_token) {
      addToken(data.access_token);
      return true;
    }
    return false;
  };

  const signout = async () => {
    console.log("signout está sendo executada.");
    setToken("");
    localStorage.clear();
  };

  const addToken = (token: string) => {
    setToken(token)
    localStorage.setItem("access_token", token);
  };

  return <AuthContext.Provider value={{ token, signin, signout }}>{children}</AuthContext.Provider>;
};
