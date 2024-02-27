import imgCover from '../img/cover.png';
import styles from './Header.module.css';

export default function Header () : JSX.Element
{
    return (
    <header className={styles.header}>
        <img src={imgCover} className={styles.img}/>
    </header>
    );
}