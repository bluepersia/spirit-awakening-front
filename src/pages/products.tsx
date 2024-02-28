import { IProduct } from '../model/product';
import styles from './products.module.css';
import {useQuery} from '@tanstack/react-query';
import imgSpinner from '../img/ring-resize.svg';
import { apiUrl, imgUrl } from '../util/url';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../App';

export default function Products () : JSX.Element
{
    const {data:products, isLoading, error} = useQuery({queryKey:['products'], queryFn: fetchProducts});
    const {addToCart} = useContext (AppContext);

    async function fetchProducts () : Promise<IProduct[]>
    {
        const res = await fetch (`${apiUrl}/products`);

        if (!res.ok)
            throw Error ((await res.json()).message);


        return (await res.json()).data.products;
    }
    return (
        <main className={styles.main}>
            <ul className={styles.categories}>
                <li data-category='ausbildung'>Ausbildungen</li>
                <li data-category='kurs'>Kurse</li>
                <li data-category='workshop'>Workshops</li>
                <li data-category='zeremonie'>Zeremonien</li>
                <li data-category='coaching'>Coaching</li>
                <li data-category='musik'>Musik</li>
                <li data-category='ebook'>Ebooks</li>
                <li data-category='meditation'>Meditationen</li>
            </ul>

            <div className={styles.productList}>
                {isLoading && <img src={imgSpinner}/>}
                {error && <h3 className='error'>{error.message}</h3>}
                {products && products.map (product => (
                    <div className={styles.product} key={product._id}>
                        <div className={styles.productText}>
                            <h2 className={styles.productName}>{product.name}</h2>
                            <p className={styles.productSummary}>{product.summary}</p>
                        </div>
                        <img className={styles.productImg} src={`${imgUrl}/${product.image}`}/>
                    <div className={styles.btns}>
                        <p className={styles.productPrice}>€{product.price.toFixed(2)}</p>
                        <button onClick={() => addToCart(product)} className={styles.btn + ' btn-gold'}>Kaufen</button>
                        <Link to={product._id} className={styles.btn + ' btn-gold'}>Mehr</Link>
                    </div>
                    </div>
                ))}
            </div>
        </main>
    )
}