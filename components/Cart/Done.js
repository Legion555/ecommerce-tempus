import {useEffect, useState} from 'react'
import emailjs from 'emailjs-com'
//redux
import {useSelector} from 'react-redux'
//icons
import {IoIosCheckmarkCircle} from 'react-icons/io'



export default function Done() {
    const order = useSelector(state => state.order.value)

    useEffect(() => {        
        const payload = {
            buyerUsername: order.buyerUsername,
            buyerEmail: order.buyerEmail,
            orderId: order._id,
            profileLink: `https://www.saboerewors.com/u/${order.buyerId}`
        }
        console.log(payload)
        emailjs.send('service_akf9odd', 'template_452syap', payload, 'user_OtuZx1LoSqVcMymMnCqR8')
        .then((result) => {
            console.log('Email sent')
        }, (error) => {
            console.log(error.text);
        });
    }, [])
    
    return (
        <div className="text-center">
            <IoIosCheckmarkCircle className="mx-auto text-blue-600 text-8xl" />
            <h1 className="text-xl">Order successfully placed.</h1>
            <p>You should receive an email receipt soon.</p>
        </div>
    )
}