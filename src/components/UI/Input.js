import React from 'react';
import classes from './Input.module.css';
const Input =  (props) => {
    console.log(props)
    return (
        <div className={props.style}>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input {...props.input}  />
            {props.children}
        </div>
    );
}

export default Input;