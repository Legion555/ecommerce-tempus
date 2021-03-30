import {useState, useEffect} from 'react'
import axios from 'axios'
//components
import PendingOrders from './PendingOrders'
import CompletedOrders from './CompletedOrders'
//functions
let _ = require('lodash');


export default function Index() {
    const [completedOrders, setCompletedOrders] = useState([]);

    useEffect(() => {
        axios.get('/api/orders/getCompleted')
        .then(response => {
            setCompletedOrders(response.data);
        }).catch(error => console.log(error))
    }, [])

    return(
        <div className="w-full p-4 flex flex-col gap-8">
            <PendingOrders completedOrders={completedOrders} setCompletedOrders={setCompletedOrders} />

            <CompletedOrders completedOrders={completedOrders} />
        </div>
    )
}

