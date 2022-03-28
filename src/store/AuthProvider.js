import jwt from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react"
import { 
    API_URLS, 
    getFormBody, 
    getItemInLocalStorage, 
    LOCALSTORAGE_TOKEY_KEY, 
    removeItemFromLocalStorage, 
    setItemInLocalStorage, 
} from "./utils";


const initialState = {
    user : null,
    signup : () => {},
    login : () => {},
    logout : () => {},
    loading : true
}

export const AuthContext = createContext(initialState);

export const useAuth = () => {
    return useContext(AuthContext);
}

const AuthProvider = (props) => {
    const [user , setUser] = useState(null);
    const [loading , setLoading] = useState(true);

    useEffect(()=>{
        const getUser = () => {
            const userToken = getItemInLocalStorage(LOCALSTORAGE_TOKEY_KEY);
            if(userToken) {
                const userDetails = jwt(userToken);
                setUser({...userDetails})
            }
            setLoading(false);
        }

        getUser();
    },[])


    const signup = async(name,email,password,confirmPassword) => {
        const response = await fetch(API_URLS.signup,{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            },
            body : getFormBody({name,email,password,confirm_password:confirmPassword})
        })
        const data = await response.json();
        if(!data.success) {
            return {
                success : false,
                message : data.message
            }
        }
        const authToken = data.data.token ? data.data.token : null;
        setUser(data.data.user);
        setItemInLocalStorage(LOCALSTORAGE_TOKEY_KEY , authToken);
        return {
            success : true,
            message : data.message
        }
    }

    const login = async(email , password) => {
        const response = await fetch(API_URLS.login,{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            },
            body: getFormBody({email, password })
        })
        const data = await response.json();
        if(! data.success) {
            return {
                success : false,
                message : data.message
            }
        }
        const authToken = data.data.token ? data.data.token : null;
        setUser(data.data.user);
        setItemInLocalStorage(LOCALSTORAGE_TOKEY_KEY , authToken);
        return {
            success : true,
            message : data.message
        }
    }

    const logout = () => {
        setUser(null);
        removeItemFromLocalStorage(LOCALSTORAGE_TOKEY_KEY);
    }

    const state = {
        user,
        loading,
        signup,
        login,
        logout
    }
    return (
        <AuthContext.Provider value = {state}>
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;