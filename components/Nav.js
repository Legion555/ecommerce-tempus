import {useState} from 'react'
import Link from 'next/link'
//components
import DarkMode from './DarkMode'
//redux
import {useSelector, useDispatch} from 'react-redux'
import {resetUserData} from '../slices/userDataSlice'
import {resetCart} from '../slices/cartSlice'
import {updateModal} from '../slices/modalSlice'
//icons
import {AiOutlineUser} from 'react-icons/ai'
import {RiShutDownLine} from 'react-icons/ri'

export default function Nav() {
    const dispatch = useDispatch()
    const userData = useSelector(state => state.userData.value)
    const cart = useSelector(state => state.cart.value)
    const darkMode = useSelector(state => state.darkMode.value)

    return (
        <div className={`w-full h-16 fixed z-40 top-0 px-4 flex justify-between items-center ${darkMode ? 'text-gray-200 bg-gray-900' : 'text-gray-800 bg-gray-200' }`}>
            <h1 className="xl:text-4xl">Tempus</h1>

            {userData ?
                <div className="flex items-center gap-1 md:gap-4">
                    <h1 className="p-1 xl:p-2 xl:text-2xl bg-green-600 cursor-pointer hover:text-green-600 hover:bg-gray-200"
                        onClick={() => dispatch(updateModal('cart'))}>Cart ({cart.length})</h1>
                    {/* <Link href={{pathname: '/u/[id]', query: {id: userData._id}}} >
                        <AiOutlineUser className="text-blue-600 text-3xl xl:text-4xl" /></Link> */}
                    <RiShutDownLine className="text-red-600 text-3xl xl:text-4xl" onClick={() => dispatch(resetUserData())} />
                    <DarkMode />
                </div>
            :
                <div className="flex items-center gap-1 md:gap-4">
                    <h1 className="p-2 rounded-xl text-sm md:text-base text-gray-800 bg-gray-200 hover:text-gray-200 hover:bg-blue-800 cursor-pointer"
                        onClick={() => dispatch(updateModal('auth'))}>Login/Register</h1>
                    <DarkMode />
                </div>
            }
        </div>
    )
}