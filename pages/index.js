import {useState, useEffect} from 'react'
import Head from 'next/head'
import axios from 'axios'
//redux
import { useDispatch, useSelector } from 'react-redux'
import {updateProductList} from '../slices/productListSlice'
import {resetUserData} from '../slices/userDataSlice'
//components
import Nav from '../components/Nav';
import ProductList from '../components/ProductList';
import Cart from '../components/Cart/index';
import AuthModal from '../components/Authentication';



export default function Home() {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userData.value);
  const modal = useSelector(state => state.modal.value);
  const darkMode = useSelector(state => state.darkMode.value)

  useEffect(() => {
    if (userData && userData.role === 'admin') {
      dispatch(resetUserData())
    }
    //Get products
    axios.get('/api/products/getAll')
    .then(response => {
        dispatch(updateProductList(response.data))
    }).catch(error => console.log(error))
  }, [])
  
  return (
    <div className={`w-full min-h-screen ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <Head>
            <title>Tempus</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <Nav />
        
        <ProductList />

        {modal === 'cart' && <Cart />}

        {modal === 'auth' &&  <AuthModal /> }

    </div>
  )
}