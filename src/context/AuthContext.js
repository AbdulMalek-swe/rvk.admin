import { createContext } from "react";
import { userLogin } from "../api/authService";

 export const AuthContext = createContext()

 export const AuthProvider = ({children})=>{
    let login = async e =>{
      return await userLogin(e)
    }
    return(
        <AuthContext.Provider value={{login}}>
          {children}
        </AuthContext.Provider>
    )
 }