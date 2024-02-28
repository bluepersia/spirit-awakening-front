import { useContext, useEffect, useState } from 'react';
import styles from './cart.module.css';
import { AppContext } from '../App';
import { apiUrl, imgUrl } from '../util/url';
import BackBtn from '../components/BackBtn';
import {PayPalScriptProvider, PayPalButtons} from '@paypal/react-paypal-js';

export default function Cart () : JSX.Element
{
    const {cart, removeFromCart, resetCart} = useContext (AppContext);
    const [success, setSuccess] = useState<boolean> (false);

    useEffect (() =>
    {
        if (success)
            resetCart ();
    }, [success])

    function createOrder() {

        // Order is created on the server and the order id is returned
        const order = cart.map (product => ({name:product.name, price:product.price}));

        return fetch(`${apiUrl}/orders/paypal-create`, {

          method: "POST",

           headers: {

            "Content-Type": "application/json",

          },

          // use the "body" param to optionally pass additional order information

          // like product skus and quantities

          body: JSON.stringify(order),

        })

        .then((response) => response.json())

        .then((order) => order.id);

      }

      function onApprove(data: {orderID:string}) {

        // Order is captured on the server

        return fetch(`${apiUrl}/orders/paypal-capture`, {

         method: "POST",

          headers: {

           "Content-Type": "application/json",

         },

         body: JSON.stringify({

           orderID: data.orderID

         })

       })

       .then((response) => { 
        const json = response.json() 
        setSuccess (true);
        return json;
    });

     }

    
    return (
        <main className={styles.main}>
            <BackBtn/>
            {cart.length > 0 && !success ? (<><table className={styles.table}>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th></th>
                    </tr>
                    {cart.map (product => (
                        <tr key={product._id}>
                            <th>{product.name}</th>
                            <th>€{product.price.toFixed(2)}</th>
                            <th><img className={styles.productImg} src={`${imgUrl}/${product.image}`}/></th>
                            <th><i onClick={() => removeFromCart(product._id)} className="fa-solid fa-circle-xmark"></i></th>
                        </tr>
                    ))}
                </tbody>
            </table>
            <PayPalScriptProvider options={{clientId: 'Abp2tpRP2XiipfdYbD7CakHHMD_CMUGtBYwmAkaZJW_bDOzRE3Z26D26cjhd-JTU0THWPM225d_FgTsP', intent:'capture', currency:'EUR'}}>
                    <PayPalButtons createOrder={createOrder} onApprove={onApprove}/>
            </PayPalScriptProvider>
            </>) : success ? <h3>Vielen dank!</h3> : <h3>Der Warenkorb ist leer.</h3>}
                    
            
        </main>
    )
}