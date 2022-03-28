import { useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from './HeaderCartButton.module.css';
import { useCart } from '../../store/CartProvider';
import { Link } from "react-router-dom";
import { useAuth } from "../../store/AuthProvider";
const HeaderCartButton = (props) => {
    const cart = useCart();
    const auth = useAuth();
    const [isCartBumped , setIsCartBumped] = useState(false);

    const btnClasses = `${classes.button} ${isCartBumped ? classes.bump : ''}`

    const numberOfItems = cart.items.reduce((curNumber,item)=>{
        return curNumber + item.amount
    },0);

    useEffect(()=>{
        setIsCartBumped(true);

        const timer = setTimeout(() => {
            setIsCartBumped(false);
        }, 300);

        return () => clearTimeout(timer)
    },[cart.items])

    const logoutHandler = () => {
        auth.logout();
    }

    return (
        <div className={classes['btn-group']}>
            
            {
                auth.user ?
                <>
                    
                    <button className={btnClasses} onClick={props.onShowCart}>
                        <span className={classes.icon}>
                            <CartIcon />
                        </span>
                        <span >Your Cart</span>
                        <span className={classes.badge}>{numberOfItems}</span>
                    </button>
                    <button className={classes.button}>
                        {auth.user.name}   
                    </button>
                    <button className={classes.button} onClick={logoutHandler}>
                        logout    
                    </button>
                </>
                
                :
                <button className={btnClasses}>
                    <Link to="/login" className={classes.login} >Login</Link>
                </button>
            }
            
        </div>
    );

}

export default HeaderCartButton;