import {useState, useEffect} from 'react'
import axios from 'axios'
//redux
import {useSelector, useDispatch} from 'react-redux'
import {resetUserData} from '../../slices/userDataSlice'
import {updateProductList} from '../../slices/productListSlice'
//components
import Nav from './Nav'
import Products from './Products/index'
import Orders from './Orders/index'
//icons
import {FaArrowRight} from 'react-icons/fa'
import {RiShutDownLine} from 'react-icons/ri'



export default function Index() {
    const dispatch = useDispatch();
    const [view, setView] = useState('products');

    return (
        <div className="w-full min-h-screen bg-gray-100">
            <Nav view={view} setView={setView} />

            <div className="pt-24 lg:pt-0 lg:pl-64">
                {view === 'dashboard' && <Products />}
                {view === 'products' && <Products />}
                {view === 'orders' && <Orders />}
                {view === 'customers' && <Products />}
            </div>

            <RiShutDownLine className="absolute z-40 top-2 right-2 text-3xl text-red-600 cursor-pointer" onClick={() => dispatch(resetUserData())} />
        </div>
    )
}