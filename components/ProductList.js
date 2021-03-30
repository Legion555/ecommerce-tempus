import axios from 'axios';
import {useState, useEffect} from 'react';
import Image from 'next/image'
//redux
import { useSelector, useDispatch } from 'react-redux'
import {addToCart, addQuantity, removeQuantity, removeFromCart} from '../slices/cartSlice'
import {updateProductList} from '../slices/productListSlice'
import {updateModal} from '../slices/modalSlice'
//functions
import {numberWithCommas} from '../functions/numberWithCommas';
let _ = require('lodash');
//icons
import { AiOutlineLogin } from 'react-icons/ai';
import { FaPlus, FaMinus, FaShoppingCart } from 'react-icons/fa';



export default function ProductList() {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.userData.value)
    const productList = useSelector(state => state.productList.value)
    const cart = useSelector(state => state.cart.value)
    const darkMode = useSelector(state => state.darkMode.value)

    return (
        <div className="w-full md:w-10/12 mx-auto px-2 md:px-0 pt-24">
            <div className="flex items-center mb-4">
                <div className="w-full h-1 bg-gray-400" />
                <h1 className={`mx-2 text-3xl md:text-6xl ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>PRODUCTS</h1>
                <div className="w-full h-1 bg-gray-400" />
            </div>
            <div className="flex flex-wrap justify-evenly gap-4">
                {productList && productList.map(product =>
                    <ProductCard key={product._id} productData={product} />
                )}
            </div>
        </div>
    )
}

const ProductCard = ({productData}) => {
    const dispatch = useDispatch()
    const userData = useSelector(state => state.userData.value);
    const cart = useSelector(state => state.cart.value);

    const [isHover, setIsHover] = useState(false);

    const addItem = (item) => {
        // if item already exists on cart
        if (cart.find(product => product._id == item._id)) {
            let ind = _.findIndex(cart, {_id: item._id});
            return dispatch(addQuantity(ind));
        }
        let tempItem = {...item, quantity: 1};
        dispatch(addToCart(tempItem));
    }

    const remove = (item) => {
        let tempItem = cart[_.findIndex(cart, {_id: productData._id})];
        if (tempItem.quantity != 1) {
            let ind = _.findIndex(cart, {_id: item._id});
            return dispatch(removeQuantity(ind));
        }
        let ind = _.findIndex(cart, {_id: item._id});
        dispatch(removeFromCart(ind));
    }

    return (
        <div key={productData._id} className="w-full md:w-5/12 xl:w-3/12 relative p-4 rounded-2xl shadow-lg bg-gray-100 overflow-hidden"
            onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
            <h1 className="text-xl text-center text-gray-900 font-bold">{productData.name}</h1>
            <p className="mb-4 text-center text-gray-700 font-bold">${numberWithCommas(parseInt(productData.price, 10))}</p>
            <div className="w-full h-32 md:h-40 relative">
                <Image className="object-contain" src={productData.imgUrl ? productData.imgUrl : 'https://via.placeholder.com/250'} layout="fill" />
            </div>
            
                {userData ?
                <div className="absolute left-4 transform top-1/2 -translate-y-1/2 flex flex-col gap-2 text-3xl">
                    {_.findIndex(cart, {_id: productData._id}) != -1 &&
                    <FaMinus className="w-8 h-8 p-1 text-gray-200 rounded-full bg-red-600 hover:bg-red-800 cursor-pointer" onClick={() => remove(productData)} />
                    }
                    <p className="w-8 h-8 leading-8 text-center text-xl text-gray-200 rounded-full bg-gray-900 select-none">
                            {_.findIndex(cart, {_id: productData._id}) != -1 ? cart[_.findIndex(cart, {_id: productData._id})].quantity : '0'}</p>
                    <FaPlus className="w-8 h-8 p-1 text-gray-200 rounded-full bg-green-600 hover:bg-green-800 cursor-pointer" onClick={() => addItem(productData)} />
                    <FaShoppingCart className="w-8 h-8 p-1 text-gray-200 rounded-full bg-yellow-600 hover:bg-yellow-800 cursor-pointer" onClick={() => dispatch(updateModal('cart'))} />
                </div>
                :
                <div className="absolute left-4 transform top-1/2 -translate-y-1/2 flex flex-col gap-2 text-3xl">
                    <AiOutlineLogin className="w-8 h-8 p-1 text-gray-200 rounded-full bg-blue-600" onClick={() => dispatch(updateModal('auth'))} />
                </div>
                }
        </div>
    )
}