import axios from "axios"
import { useState } from "react"
//redux
import {useDispatch} from 'react-redux'
import {updateUserData} from '../../slices/userDataSlice'
import {updateModal} from '../../slices/modalSlice'



export default function Login({setView}) {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('john@gmail.com')
    const [emailError, setEmailError] = useState(null)
    const [password, setPassword] = useState('john123')
    const [passwordError, setPasswordError] = useState(null)

    const login = (e) => {
        e.preventDefault()

        //reset errors
        setEmailError(null); setPasswordError(null);

        //validation
        if (email.length == 0) {setEmailError('Too short'); return setEmail('')}
        if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email)) {setEmailError('invalid email'); return setEmail('')}
        if (password.length == 0) {setPasswordError('Too short'); return setPassword('')}

        const payload = {
            email: email,
            password: password
        }
        axios.post('/api/users/login', payload)
        .then(result => {
            if (result.data == 'email not found') {
                setEmailError('email not found')
                setEmail('')
            } else if (result.data == 'password is invalid') {
                setPasswordError('password is invalid')
                setPassword('')
            } else if (result.data.status == 'success') {
                //set userData redux
                dispatch(updateUserData(result.data.userData));
                //close modal
                dispatch(updateModal(null))
            } else {
                console.log(result)
            }
        }).catch(err => console.log(err))
    }

    return (
        <div className="w-full h-full p-8 md:p-16 text-center text-gray-700 bg-gray-100">
            <h1 className="mb-8 text-3xl md:text-6xl">SA Boerewors</h1>
            <p className="mb-16 text-2xl md:text-4xl text-gray-500">Sign in to continue</p>
            <form className="mb-16">
                <input className={`w-full mb-8 p-4 text-xl ${emailError !== null && 'border-2 border-red-500'}`}
                    type="text" placeholder={emailError === null ? "Email" : emailError}
                    value={email} onChange={(e) => setEmail(e.target.value)} />

                <input className={`w-full mb-8 p-4 text-xl ${passwordError !== null && 'border-2 border-red-500'}`}
                    type="text" placeholder={passwordError === null ? "Password" : passwordError}
                    value={password} onChange={(e) => setPassword(e.target.value)} />

                <button className="w-full p-4 text-4xl text-gray-100 bg-blue-800 hover:bg-blue-600 transition ease-in-out duration-150" onClick={(e) => login(e)}>Sign in</button>
            </form>
            <p className="text-xl md:text-2xl">Don't have an account? <span className="font-bold cursor-pointer" onClick={() => setView('register')}>Sign up</span></p>
        </div>
    )
}