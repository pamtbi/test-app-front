/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, createContext, FC, useContext, useEffect, useCallback } from "react";
import {link} from "@/utils/link"
import { useNavigate } from "react-router-dom";
import {get} from "@/utils/get"

export interface User {
  id: string;
  username: string;
  role: string;
  results?: {
    score: number;
    answers: any;
    date: string;
    _id: string;
  }[];
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  logout: () => void;
  token: string | null;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

type UserProviderProps = {
  children: React.ReactNode;
};

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token") || null;
  });

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    // console.log("Logout successful");
  }, []);

  const login = useCallback(async () => {
    try {
      setLoading(true);

      const {data, response} = await get(link("/api/user"), token)

      if (!response?.ok) {
        throw new Error('Failed to fetch user data');
      }
      
      setUser(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      logout();
    } finally {
      setLoading(false);
    }
    
  }, [token, logout]);

  useEffect(() => {
    if(token) {
      login();
    }
  }, [token, login]);

  useEffect(() => {
    localStorage.setItem("token", token || "");
  }, [token])

  useEffect(() => {
    if(token) {
      if(user?.role === "admin") {
        navigate("/admin")
      } else {
        navigate("/")
      };
    } else {
      navigate("/login")
    }
  }, [user, navigate, token]);

  return (
    <UserContext.Provider value={{ user, setUser, logout, setToken, token }}>
      {loading && (
        <div className="loader">
          <div className="loader__item"></div>
        </div>
      )}
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType | null => {
  const context = useContext(UserContext);
  if (context === undefined) {
    console.error("useUser must be used within a UserProvider");
    return null;
  }
  return context;
};
