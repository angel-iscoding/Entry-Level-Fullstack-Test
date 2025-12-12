import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("Auth debe usarse dentro de un provider");
    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    const URL = "http://localhost:3001/api";

    const register = async ( userData ) => {
        try {
            const res = await fetch(`${URL}/auth/register`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify( userData ),
            });

            const data = await res.json();

            if (!res.ok)
              throw new Error(data.error || "Error al hacer la solicitud");

            return true;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    const login = async ( email, password ) => {
        try {
            const res = await fetch(`${URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({email, password})
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || "Error al hacer la solicitud");
            
            setUser(data.data);
            setIsAuthenticated(true);
            localStorage.setItem("token", data.token);

            return true;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("token");
    }

    return (
      <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated }}>
        {children}
      </AuthContext.Provider>
    );
}

