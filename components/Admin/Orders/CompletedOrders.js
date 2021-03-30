import {useState, useEffect} from 'react'
import axios from 'axios'
//redux
import {useSelector, useDispatch} from 'react-redux'
//functions
let _ = require('lodash');
import {numberWithCommas} from '../../../functions/numberWithCommas';

export default function PendingOrders({completedOrders, setCompletedOrders}) {
    return (
        <div className="w-full p-4 rounded bg-white">
            <h1 className="py-2 text-2xl text-gray-600">Completed Orders</h1>
            <div className="mb-2 p-2 py-3 hidden md:flex justify-between rounded text-gray-200 bg-blue-600">
                <h1 className="w-2/12">Date Completed</h1>
                <h1 className="w-5/12">Contact Details</h1>
                <h1 className="w-5/12">Order details</h1>
            </div>
            <div>
            {completedOrders.map(order => 
                <Order key={order._id} order={order} />
            )}
            </div>
        </div>
    )
}

const Order = ({order}) => {
    const dispatch = useDispatch()

    const [isHovering, setIsHovering] = useState(false);

    return (
        <div className={`mb-2 p-2 flex flex-col md:flex-row gap-4 md:gap-1 justify-between items-start bg-gray-200 ${isHovering ? 'opacity-100' : 'opacity-60'}`}
            onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => (setIsHovering(false))} >
            <p className="md:w-2/12"><span className="md:hidden">Date completed: </span>{order.dateCompleted.slice(0,10)}</p>
            <p className="md:w-5/12">
                <p className="w-1/12">{order.shipping.contactName}</p>
                <p className="w-2/12">{order.shipping.contactNumber}</p>
                <p className="w-2/12">{order.buyerEmail}</p>
            </p>
            <div className="md:w-5/12">
                {order.products.map(product => 
                    <div key={product._id} className="flex gap-2">
                        <p>{product.name}</p>
                        <p>{product.quantity}x</p>
                    </div>
                )}
                <p className="w-max p-1 bg-green-200">${numberWithCommas(order.totalCost)}</p>
            </div>
        </div>
    )
}