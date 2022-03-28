import React, { useState } from 'react'
import { useCart } from '../store/CartProvider';
import Cart from './Cart/Cart';
import Header from './Layout/Header';
import Meals from './Meals/Meals';

const Home = () => {
    const [isCartShown , setIsCartShown] = useState(false);
    const cart = useCart();
    const handleShowCart = () => {
        if(cart.items.length > 0) {
            setIsCartShown(true);
        }
        
    }
    const handleHideCart = () => setIsCartShown(false);
    return (
        <>
            {isCartShown &&  <Cart onCloseCart = {handleHideCart} />}
            <Header onShowCart={handleShowCart} />
            <main>
            <Meals />
            </main>
        </>
    )
}

export default Home;
