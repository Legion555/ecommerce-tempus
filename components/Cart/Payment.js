import {useEffect, useState} from 'react'
import axios from 'axios'
import Image from 'next/image'
//redux
import {useDispatch, useSelector} from 'react-redux'
import {addQuantity, removeQuantity, removeFromCart, resetCart} from '../../slices/cartSlice'
import {resetShipping} from '../../slices/shippingSlice'
import {updateOrder} from '../../slices/orderSlice'
//functions
import {numberWithCommas} from '../../functions/numberWithCommas';
let _ = require('lodash');
//icons
import {AiOutlinePlus, AiOutlineMinus} from 'react-icons/ai'
import {FaArrowLeft, FaArrowRight} from 'react-icons/fa'



export default function Payment({setPhase}) {
    const dispatch = useDispatch()
    const userData = useSelector(state => state.userData.value)
    const cart = useSelector(state => state.cart.value)
    const shipping = useSelector(state => state.shipping.value)

    const add = (item) => {
        let ind = _.findIndex(cart, {_id: item._id});
        return dispatch(addQuantity(ind));
    }

    const remove = (item) => {
        if (item.quantity != 1) {
            let ind = _.findIndex(cart, {_id: item._id});
            return dispatch(removeQuantity(ind));
        }
        let ind = _.findIndex(cart, {_id: item._id});
        dispatch(removeFromCart(ind));
    }

    const placeOrder = () => {
        const payload = {
            buyerId: userData._id,
            buyerUsername: userData.username,
            buyerEmail: userData.email,
            shipping: shipping,
            products: cart,
            subTotal: calcTotalCost(),
            totalCost: calcTotalCostWithShipping()
        }
        axios.post('/api/orders/place', payload)
        .then(response => {
            dispatch(updateOrder(response.data))
            setPhase('done');
            dispatch(resetCart());
            dispatch(resetShipping());
        }).catch(error => console.log(error));
    }

    const calcTotalCost = () => {
        let totalCost = 0;
        cart.forEach(item => {
            totalCost = totalCost + (item.quantity * item.price);
        })
        return totalCost;
    }

    const calcTotalCostWithShipping = () => {
        let totalCost = 0;
        cart.forEach(item => {
            totalCost = totalCost + (item.quantity * item.price);
        })
        return totalCost + shipping.shippingCost;
    }

    return (
        <div className="text-gray-600">
            <h1 className="mb-4 text-center text-2xl font-bold">Confirm your order</h1>

            <div className="flex flex-col gap-2 mb-8">
            {cart.map(item =>
                <div key={item._id} className="p-2 border-b-2 border-gray-300 select-none">
                    <div className="flex">
                        <div className="w-20 h-20 relative">
                            <Image className="object-contain" src={item.imgUrl} layout="fill" />
                        </div>
                        <h1 className="w-full text-xl">{item.name}</h1>
                    </div>
                    <div className="w-full flex justify-between">
                        <div className="w-full flex items-center gap-2 text-2xl">
                            <AiOutlinePlus className="text-green-600 hover:text-green-800 cursor-pointer" onClick={() => add(item)} />
                            <p className="text-gray-600">{item.quantity}</p>
                            <AiOutlineMinus className="text-red-600 hover:text-red-800 cursor-pointer" onClick={() => remove(item)} />
                        </div>
                        <h1 className="w-full text-right text-xl">${numberWithCommas(item.quantity * item.price)}</h1>
                    </div>
                </div>
            )}
            </div>

            <h1 className="mb-4 font-bold">Payment method: Cash on Delivery</h1>

            <div className="mb-4">
                <div className="flex justify-between">
                    <p>Subtotal: </p>
                    <p>${numberWithCommas(calcTotalCost())}</p>
                </div>
                <div className="flex justify-between">
                    <p>Shipping Cost: </p>
                    <p>${numberWithCommas(shipping.shippingCost)}</p>
                </div>
                <div className="flex justify-between pt-2 border-t-2 border-gray-600 font-bold">
                    <p>Total Cost: </p>
                    <p>${numberWithCommas(calcTotalCostWithShipping())}</p>
                </div>
            </div>            

            <div className="flex gap-5">
            <button className="p-2 text-xl rounded text-blue-600 border-2 border-blue-600" onClick={() => setPhase('shipping')}>
                        <FaArrowLeft className="inline" /> Back</button>
            <button className="p-2 text-xl rounded text-gray-200 bg-blue-600" onClick={placeOrder}>
                        Place Order <FaArrowRight className="inline" /></button>
            </div>
        </div>
    )
}