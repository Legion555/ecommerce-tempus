import {useState} from 'react'
//components
import Shopping from './Shopping'
import Shipping from './Shipping'
import Payment from './Payment'
import Done from './Done'
//redux
import { useSelector, useDispatch } from 'react-redux'
import {updateModal} from '../../slices/modalSlice'
//spring
import {useSpring, animated} from 'react-spring'
//functions
import axios from 'axios';
let _ = require('lodash');
//icons
import {MdCancel} from 'react-icons/md'



export default function Cart() {
    const dispatch = useDispatch()
    const userData = useSelector(state => state.userData.value)
    const cart = useSelector(state => state.cart.value)

    const [phase, setPhase] = useState('shopping');

    //anims
    const extend = useSpring({transform: 'translateX(0px)', from: {transform: 'translateX(100%)'}});

    return (
        <animated.div style={extend} className="w-full md:w-9/12 lg:w-6/12 xl:w-4/12 min-h-screen fixed right-0 top-0 p-4 shadow bg-white z-40">
            <h1 className="mb-4 text-4xl text-center">Cart</h1>

            <div className="mb-4 flex justify-evenly">
                <Phase name={'Cart'} isActive={phase == 'shopping' ? true : false} />
                <Phase name={'Shipping'} isActive={phase == 'shipping' ? true : false} />
                <Phase name={'Payment'} isActive={phase == 'payment' ? true : false} />
                <Phase name={'Done'} isActive={phase == 'done' ? true : false} />
            </div>

            {phase == 'shopping' && <Shopping setPhase={setPhase} />}
            {phase == 'shipping' && <Shipping setPhase={setPhase} />}
            {phase == 'payment' && <Payment setPhase={setPhase} />}
            {phase == 'done' && <Done />}
            
            <MdCancel className="absolute top-4 right-4 text-red-600 text-4xl" onClick={() => dispatch(updateModal(''))} />
        </animated.div>
    )
}

const Phase = ({name, isActive}) => {
    return (
        <div className="flex flex-col items-center">
            <h1 className={`font-bold ${isActive ? 'text-gray-800' : 'text-gray-400' }`}>{name}</h1>
            <div className={`w-4 h-4 rounded-full ${isActive ? 'bg-blue-600' : 'bg-gray-400'}`} />
        </div>
    )
}