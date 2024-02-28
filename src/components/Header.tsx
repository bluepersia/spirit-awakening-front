import { useContext } from 'react';
import imgCover from '../img/cover.png';
import styles from './Header.module.css';
import { AppContext } from '../App';
import { Link } from 'react-router-dom';

export default function Header () : JSX.Element
{
    const {cart} = useContext (AppContext);
    return (
    <header className={styles.header}>

    <Link to='cart' className={styles.cart}>
        <i className={"fa-solid fa-cart-shopping " + styles.cartIcon}></i>
        <p className={styles.cart_text}>({cart.length})</p>
    </Link>
        <img src={imgCover} className={styles.img}/>
    </header>
    );
}