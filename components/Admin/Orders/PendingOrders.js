import {useState, useEffect} from 'react'
import axios from 'axios'
//redux
import {useSelector, useDispatch} from 'react-redux'
//functions
let _ = require('lodash');
import {numberWithCommas} from '../../../functions/numberWithCommas';



export default function PendingOrders() {
    const [pendingOrders, setPendingOrders] = useState([])

    useEffect(() => {
        axios.get('/api/orders/getActive')
        .then(response => {
            setPendingOrders(response.data);
        }).catch(error => console.log(error))
    }, [])

    return (
        <div className="w-full p-4 rounded bg-white">
            <h1 className="py-2 text-2xl text-gray-600">Pending Orders</h1>
            <div className="mb-2 p-2 py-3 hidden md:flex justify-between rounded text-gray-200 bg-blue-600">
                <h1 className="w-3/12">Delivery Details</h1>
                <h1 className="w-3/12">Contact Details</h1>
                <h1 className="w-4/12">Order Details</h1>
                <h1 className="w-2/12">Actions</h1>
            </div>
            <div>
            {pendingOrders.map(order => 
                <Order key={order._id} order={order} pendingOrders={pendingOrders} setPendingOrders={setPendingOrders} />
            )}
            </div>
        </div>
    )
}

const Order = ({order, pendingOrders, setPendingOrders}) => {
    const cancelOrder = () => {
        const payload = {
            orderId: order._id,
            buyerId: order.buyerId
        }
        axios.delete('/api/orders/delete', {params: payload})
        .then(response => {
            console.log(response)
        }).catch(error => console.log(error));
        axios.put('/api/users/deleteOrder', payload)
        .then(response => {
            let ind = _.findIndex(pendingOrders, {_id: order._id});
            let tempList = pendingOrders;
            tempList = tempList.splice(ind,1);
            setPendingOrders(tempList);
        }).catch(error => console.log(error));
    }

    const completeOrder = () => {
        const payload = {
            orderId: order._id,
            buyerId: order.buyerId
        }
        axios.post('/api/orders/completeOrder', payload)
        .then(response => {
            const secondPayload = {
                buyerId: response.data.buyerId,
                id: response.data._id,
                dateCompleted: response.data.dateCompleted
            }
            axios.put('/api/users/addCompletedOrder', secondPayload)
            .then(result => {
                
            }).catch(err => console.log(err))
        }).catch(error => console.log(error));
        axios.delete('/api/orders/delete', {params: payload})
        .then(response => {
            console.log(response)
        }).catch(error => console.log(error));
        axios.put('/api/users/deleteOrder', payload)
        .then(response => {
            let ind = _.findIndex(pendingOrders, {_id: order._id});
            let tempList = pendingOrders;
            tempList.splice(ind,1);
            setPendingOrders(tempList);
        }).catch(error => console.log(error));
    }

    return (
        <div className="mb-2 p-2 flex flex-col md:flex-row gap-4 md:gap-1 justify-between items-start bg-gray-200">
            <div className="md:w-3/12">
                <p><span className="md:hidden">Preferred date: </span>{order.shipping.availableDate}</p>
                <p><span className="md:hidden">Time: </span>{order.shipping.preferredTime}</p>
                <p><span className="md:hidden">Shipping method: </span>
                    {order.shipping.shippingMethod === 'pick_up' && 'Pick Up'}
                    {order.shipping.shippingMethod === 'ship' && 'Ship to address'}</p>
                <p><span className="md:hidden">Shipping address: </span>{order.shipping.shippingAddress}</p>
            </div>
            <div className="md:w-3/12">
                <p className="w-1/12">{order.shipping.contactName}</p>
                <p className="w-2/12">{order.shipping.contactNumber}</p>
                <p className="w-2/12">{order.buyerEmail}</p>
            </div>
            <div className="md:w-4/12">
                {order.products.map(product => 
                    <div key={product._id} className="flex gap-2">
                        <p>{product.name}</p>
                        <p>{product.quantity}x</p>
                    </div>
                )}
                <p className="w-max p-1 bg-green-200"><span className="md:hidden">Amount: </span>${numberWithCommas(order.totalCost)}</p>
            </div>
            <div className="md:w-2/12">
                <button className="mb-2 p-1 rounded text-gray-200 bg-green-600"
                    onClick={completeOrder} >Complete</button>
                <button className="p-1 rounded text-gray-200 bg-red-600"
                    onClick={cancelOrder} >Cancel Order</button>
            </div>
        </div>
    )
}