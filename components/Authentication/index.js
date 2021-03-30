import {useState} from 'react'
//redux
import {useDispatch} from 'react-redux'
import {updateModal} from '../../slices/modalSlice'
//spring
import {useSpring, animated} from 'react-spring'
//components
import Login from './Login'
import Register from './Register'
//icons
import {MdCancel} from 'react-icons/md'



export default function Index() {
    const dispatch = useDispatch()
    const [view, setView] = useState('login');

    //anims
    const extend = useSpring({transform: 'translateX(0px)', from: {transform: 'translateX(100%)'}});

    return (
        <animated.div style={extend} className="w-full md:w-9/12 lg:w-6/12 xl:w-4/12 h-screen fixed z-40 top-0 right-0 bg-gray-400">
            {view === 'login' && <Login setView={setView} />}
            {view === 'register' && <Register setView={setView} />}
            <MdCancel className="absolute top-4 right-4 text-red-600 text-4xl hover:text-red-800 cursor-pointer" onClick={() => dispatch(updateModal(null))} />
        </animated.div>
    )
}