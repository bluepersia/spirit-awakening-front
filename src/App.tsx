import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import './App.css'
import Layout from './components/Layout'
import Products from './pages/products'
import Product from './pages/product';
import { IProduct } from './model/product';
import { createContext, useEffect, useState } from 'react';
import Cart from './pages/cart';

const queryClient = new QueryClient ();

type AppContextType = {
  cart: IProduct[],
  addToCart: (product:IProduct) => void,
  removeFromCart: (id:string) => void,
  resetCart: () => void
}

export const AppContext = createContext<AppContextType> ({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  resetCart: () => {}
})

function App() {

  const [cart, setCart] = useState<IProduct[]> (() =>
  {
      const json = localStorage.getItem ('cart');

      if (json)
        return JSON.parse (json);

      return [];
  });

  useEffect (() =>
  {
      localStorage.setItem ('cart', JSON.stringify (cart));
  }, [cart])

  function addToCart (product:IProduct) : void 
  {
    if (cart.find (p => p._id === product._id))
      return;

    setCart (cart => [...cart, product]);
  }

  function removeFromCart (id:string) : void 
  {
    setCart (cart => cart.filter (p => p._id !== id));
  }

  function resetCart () : void
  {
    setCart ([]);
  }

  return (
    <AppContext.Provider value={{cart, addToCart, removeFromCart, resetCart}}>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Products/>}/>
          <Route path='cart' element={<Cart/>}/>
          <Route path=':id' element={<Product/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </QueryClientProvider>
    </AppContext.Provider>
  )
}

export default App
