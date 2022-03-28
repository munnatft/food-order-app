import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../store/AuthProvider';
import classes from './MealItemForm.module.css';
const MealItemForm = (props) => {

    const {user} = useAuth();
    const navigate = useNavigate();
    const [addedToCart , setAddedToCart] = useState(false);
    const handleCardItemSubmit = (e) => {
        if(!user) {
            return navigate("/login");
        }
        // By default , we are add only one item at a time in cart
        setAddedToCart(true);
        props.onAddToCart(1);
        setTimeout(() => {
            setAddedToCart(false);
        }, 3000);
    }
    return (
        <div className={classes.form} onSubmit={handleCardItemSubmit}>
            <button disabled={addedToCart}  className={classes.button} onClick={handleCardItemSubmit}>{addedToCart ? 'Added to cart' : 'Add'}</button>
        </div>
    );
}

export default MealItemForm;