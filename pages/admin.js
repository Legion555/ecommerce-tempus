import { useEffect } from 'react'
//components
import Login from '../components/Admin/Login'
import Index from '../components/Admin'
//redux
import {useSelector, useDispatch} from 'react-redux'
import {resetUserData} from '../slices/userDataSlice'

export default function Admin() {
    const dispatch = useDispatch()
    const userData = useSelector(state => state.userData.value)
    
    useEffect(() => {
        if (userData && userData.role == 'admin') {
            return null
        }
        return dispatch(resetUserData())
    }, [])

    return (
        <div className="w-full min-h-screen">

            {userData ?
                <Index />
            :
                <Login />
            }
            
        </div>
    )
}