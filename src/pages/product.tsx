import { useParams } from 'react-router-dom';
import styles from './product.module.css';
import {useQuery} from '@tanstack/react-query';
import { IProduct } from '../model/product';
import { apiUrl } from '../util/url';
import {Interweave} from 'interweave';
import imgSpinner from '../img/ring-resize.svg';
import { imgUrl } from '../util/url';
import BackBtn from '../components/BackBtn';

export default function Product () : JSX.Element
{
    const {id} = useParams ();
    const {data:product, isLoading, error} = useQuery({queryKey:['product'], queryFn: fetchProduct});

    async function fetchProduct () : Promise<IProduct>
    {
        const res = await fetch (`${apiUrl}/products/${id}`);

        if (!res.ok)
            throw new Error ((await res.json()).message || res.statusText);

        return (await res.json()).data.product;
    }

    return (
        <main className={styles.main}>
            {isLoading && <img src={imgSpinner}/>}
            {error && <h3 className='error'>{error.message}</h3>}
            <BackBtn/>
            {product && (
                <div className={styles.product}>
                    <img src={`${imgUrl}/${product.image}`} className={styles.img}/>
                    <Interweave className={styles.productDescription} content={product.descriptionHtml}/>
                    <p className={styles.productPrice}>€{product.price.toFixed(2)}</p>
                    <button className={styles.btn + ' btn-gold'}>Kaufen</button>
                </div>
            )}
        </main>
    )
}