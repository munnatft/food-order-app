import React, { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../store/AuthProvider';
import { emailRegex } from '../../store/utils';
import classes from './Login.module.css';

const Signup = () => {
    const [name , setName] = useState('');
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [confirmPassword , setConfirmPassword] = useState('');
    const [inputsValid , setInputsValid] = useState({
        name : true,
        email : true,
        password : true,
        confirmPassword : true
    })
    const [error , setError] = useState('');
    const [isSigning , setIsSigning] = useState(false);
    

    const {user , signup} = useAuth();
    const navigate = useNavigate();

    const signupSubmitHandler = async(e) => {
        e.preventDefault();
        const nameIsValid = name.trim().length >= 3;
        const emailIsValid = emailRegex.test(email);
        const passwordIsValid = password.length > 5;
        const confirmPasswordIsVaild = confirmPassword.length > 5;
        const formIsValid = nameIsValid && emailIsValid && passwordIsValid && confirmPasswordIsVaild;
        setInputsValid({
            name : nameIsValid,
            email : emailIsValid,
            password : passwordIsValid,
            confirmPassword : confirmPasswordIsVaild
        })
        if(!formIsValid) {
            return;
        }
        if(password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        setIsSigning(true);
        try {
            const response = await signup(name, email, password, confirmPassword);
            if(!response.success) {
                throw new Error(response.message);
            }
            navigate("/");
        } catch (error) {
            setIsSigning(false);
            setPassword('');
            setConfirmPassword('');
            setError(error.message);
        }
        
        
     
    }

    const nameClasses = `${classes.formControl} ${inputsValid.name ? '' : classes.invalid }`
    const emailClasses = `${classes.formControl} ${inputsValid.email ? '' : classes.invalid }`
    const passwordClasses = `${classes.formControl} ${inputsValid.password ? '' : classes.invalid }`;
    const cpasswordClasses = `${classes.formControl} ${inputsValid.password ? '' : classes.invalid }`;

    if(user) {
        return <Navigate to="/" />
    }
    return (
        <div className={classes.login} style={{top:'2%'}}>
            <h2>Register</h2>
            {error && <p className={classes.error}>{error}</p>}
            <form className={classes.form} onSubmit={signupSubmitHandler}>
                <div className={nameClasses}>
                    <label>Name</label>
                    <input 
                        type="text" 
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                    />
                    {!inputsValid.name && <span>Name must contain atleast 3 characters.</span>}
                </div>
                <div className={emailClasses}>
                    <label>Email</label>
                    <input 
                        type="text" 
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                    {!inputsValid.email && <span>Enter a valid email.</span>}
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
                <div className={cpasswordClasses}>
                    <label>Confirm Password</label>
                    <input 
                        type="password" 
                        value={confirmPassword}
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                    />
                    {!inputsValid.confirmPassword && <span>Confirm Password must contain atleast 6 characters.</span>}
                </div>
                <button disabled={isSigning} className={classes.btn}>
                   {isSigning ? 'Signing up...' : 'Signup'}
                </button>
            </form>
            <div className={classes.register}>
                <span>Already have an account ? </span>
                <Link to="/login">Login</Link>
                <span className={classes.separator}>|</span>
                <Link to="/">Home</Link>
            </div>
        </div>
    )
}

export default Signup;
