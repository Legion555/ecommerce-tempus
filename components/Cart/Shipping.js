import {useEffect, useState} from 'react'
//redux
import {useSelector, useDispatch} from 'react-redux'
import {updateShipping, resetShipping} from '../../slices/shippingSlice'
//icons
import {FaArrowLeft, FaArrowRight} from 'react-icons/fa'



export default function Shipping({setPhase}) {
    const dispatch = useDispatch();
    const shipping = useSelector(state => state.shipping.value)

    const [name, setName] = useState(shipping && shipping.contactName ? shipping.contactName : '')
    const [nameError, setNameError] = useState('')
    const [contactNumber, setContactNumber] = useState(shipping && shipping.contactNumber ? shipping.contactNumber : '')
    const [contactNumberError, setContactNumberError] = useState('')
    const [shippingMethod, setShippingMethod] = useState(shipping && shipping.shippingMethod ? shipping.shippingMethod : '')
    const [shippingAddress, setShippingAddress] = useState(shipping && shipping.shippingAddress ? shipping.shippingAddress : '')
    const [preferredTime, setPreferredTime] = useState(shipping && shipping.preferredTime ? shipping.preferredTime : '')
    const [availableDate, setAvailableDate] = useState(shipping && shipping.availableDate ? shipping.availableDate : '');

    const toPayment = () => {
        //validation
        if (name.length == 0) {setNameError('Please fill in name'); return setName('')}
        if (contactNumber.length == 0) {setContactNumberError('Please fill in number'); return setContactNumber('')}        

        const payload = {
            contactName: name,
            contactNumber: contactNumber,
            shippingMethod: shippingMethod,
            shippingAddress: shippingAddress,
            preferredTime: preferredTime,
            availableDate: availableDate,
            shippingCost: 50
        }
        dispatch(updateShipping(payload));
        setPhase('payment')
    }
    

    return (
        <div className="text-gray-600">
            <div className="mb-4">
                <h1 className="text-xl">Your name</h1>
                <input className="w-full p-1 rounded border-2 border-gray-300" type="text" placeholder={nameError && nameError}
                    value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            
            <div className="mb-4">
                <h1 className="text-xl">Contact number</h1>
                <input className="w-full p-1 rounded border-2 border-gray-300" type="text" placeholder={contactNumberError && contactNumberError}
                    value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
            </div>

            <div className="mb-4">
                <h1 className="text-xl">Shipping method</h1>
                <select name="time" value={shippingMethod} onChange={(e) => setShippingMethod(e.target.value)}>
                    <option value="" selected disabled>Choose a method:</option>
                    <option value="pick_up">Pick up at meeting point</option>
                    <option value="ship">Ship to address</option>
                </select>
            </div>
            
            <div className="mb-4">
                <h1 className="text-xl">Shipping address:</h1>
                <input className="w-full p-1 rounded border-2 border-gray-300" type="text" placeholder=""
                    value={shippingAddress} onChange={(e) => setShippingAddress(e.target.value)} />
            </div>
            
            <div className="mb-4">
                <h1 className="text-xl">Available Dates:</h1>
                <input type="date" name="date" value={availableDate} onChange={(e) => setAvailableDate(e.target.value)}></input>
            </div>
            
            <div className="mb-4">
                <h1 className="text-xl">Preferred time</h1>
                <select name="time" value={preferredTime} onChange={(e) => setPreferredTime(e.target.value)}>
                    <option value ="" selected disabled>Choose a time:</option>
                    <option value="sunrise">9:00 - 11:59 AM</option>
                    <option value="noon">12:00 PM - 2.59 PM</option>
                    <option value="sunset">3.00 - 6.00 PM</option>
                </select>
            </div>
            
            <div className="flex gap-5">
                <button className="p-2 text-xl rounded text-blue-600 border-2 border-blue-600" onClick={() => setPhase('shopping')}>
                            <FaArrowLeft className="inline" /> Back</button>
                <button className="p-2 text-xl rounded text-gray-200 bg-blue-600" onClick={toPayment}>
                            Proceed to payment <FaArrowRight className="inline" /></button>
            </div>            

        </div>
    )
}