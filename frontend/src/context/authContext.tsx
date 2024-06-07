import { api } from "@/services/base.service";
import { AxiosError, HttpStatusCode } from "axios";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { ReactNode, createContext, useContext, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const router = useRouter();

  const logout = () => {
    setIsAuthenticated(false);
    router.push("/signin");
    deleteCookie("token");
  };

  api.interceptors.response.use(
    async (config) => config,
    (error: AxiosError) => {
      if (error.response?.status === HttpStatusCode.Unauthorized) {
        logout();
      }
      return Promise.reject(error);
    }
  );

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
