import { Link } from 'react-router-dom';
import styles from './BackBtn.module.css';

export default function BackBtn () : JSX.Element
{
    return <Link to='..' relative='path' className={styles.btn}>← <span>Zurück</span></Link>
}