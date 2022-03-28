import meals from '../../assets/meals.jpg';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';
const Header = (props) => {
    
    return (
        <>
            <header className={classes.header}>
               <h1>Food Restaurant</h1>
               <HeaderCartButton onShowCart={props.onShowCart} />
            </header> 
            <div className={classes['main-image']}>
                <img src={meals} alt="food-meal" />
            </div>
        </>
    );
}

export default Header;