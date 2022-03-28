import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/AuthProvider';
import { emailRegex } from '../../store/utils';
import Input from '../UI/Input';
import classes from './Login.module.css';

const Login = () => {
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [inputsValid , setInputsValid] = useState({
        email : true,
        password : true
    })
    const [isLogging , setIsLogging] = useState(false);
    const [error , setError] = useState('');

    const auth = useAuth();
    const navigate = useNavigate();
    // just for implementing error boundary , this is an example , not related to login function.
    // useEffect(()=>{
    //     if(password.length > 8) {
    //         throw new Error("Password length is greater than 8 characters")
    //     }
    // },[password])

    const loginSubmitHandler = async(e) => {
        e.preventDefault();
        setIsLogging(true);
        const emailIsValid = emailRegex.test(email);
        const passwordIsValid = password.length > 5;
        const isFormValid = emailIsValid && passwordIsValid;
        setInputsValid({
            email : emailIsValid,
            password : passwordIsValid
        })
        if(!isFormValid) {
            setIsLogging(false);
            return ;
        }
        try {
            const response = await auth.login(email,password);
            if(!response.success) {
                throw new Error(response.message)
            }
            navigate("/");
        } catch (error) {
           setError(error.message);
           setEmail('');
           setPassword('');
           setIsLogging(false);
        }
     
    }

    const emailClasses = `${classes.formControl} ${inputsValid.email ? '' : classes.invalid }`
    const passwordClasses = `${classes.formControl} ${inputsValid.password ? '' : classes.invalid }`;

    if(auth.user) {
        return <Navigate to="/" />
    }
    return (
        <div className={classes.login}>
            <h2>Login</h2>
            {error && <p className={classes.error}>{error}</p>}
            <form className={classes.form} onSubmit={loginSubmitHandler}>
                <div className={emailClasses}>
                    <label>Email</label>
                    <input 
                        type="text" 
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                    {!inputsValid.email && <span>Enter a valid email</span>}
                </div>
                <div className={passwordClasses}>
                    <label>Password</label>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                    {!inputsValid.password && <span>Password must contain atleast 6 characters.</span>}
                </div>
                <button disabled={isLogging} className={classes.btn}>
                   {isLogging ? 'Logging in...' : 'Login'}
                </button>
            </form>
            <div className={classes.register}>
                <span>Don't have an account ? </span>
                <Link to="/signup">Register</Link>
                <span className={classes.separator}>|</span>
                <Link to="/">Home</Link>
            </div>
        </div>
    )
}

export default Login;
