import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import './App.css'
import Layout from './components/Layout'
import Products from './pages/products'
import Product from './pages/product';

const queryClient = new QueryClient ();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Products/>}/>
          <Route path=':id' element={<Product/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
