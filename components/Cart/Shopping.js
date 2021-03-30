import {useState} from 'react'
import Image from 'next/image'
import axios from 'axios';
//redux
import { useSelector, useDispatch } from 'react-redux'
import {removeFromCart, addQuantity, removeQuantity} from '../../slices/cartSlice'
//functions
import {numberWithCommas} from '../../functions/numberWithCommas';
let _ = require('lodash');
//icons
import {AiOutlinePlus, AiOutlineMinus} from 'react-icons/ai'
import {FaArrowRight} from 'react-icons/fa'



export default function Shopping({setPhase}) {
    const dispatch = useDispatch()
    const userData = useSelector(state => state.userData.value)
    const cart = useSelector(state => state.cart.value)

    const [isOrdered, setIsOrdered] = useState(false)

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

    const calcTotalCost = () => {
        let totalCost = 0;
        cart.forEach(item => {
            totalCost = totalCost + (item.quantity * item.price);
        })
        return totalCost;
    }

    return (
        <div>
            <div className="flex flex-col gap-2 mb-4">
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
            {userData && 
                <h1 className="font-bold">Subtotal: ${numberWithCommas(calcTotalCost())}</h1>
            }
            {cart.length > 0 &&
                <button className="p-2 text-xl rounded text-gray-200 bg-blue-600" onClick={() => setPhase('shipping')}>
                        Proceed to shipping <FaArrowRight className="inline" /></button>
            }
        </div>
    )
}

{/* <div className="flex flex-col items-center gap-5">
    <h1 className="mt-8 text-xl">Order placed</h1>
    <button className="w-max p-2 text-xl text-gray-200 bg-blue-600 rounded-xl">View orders</button>
</div> */}