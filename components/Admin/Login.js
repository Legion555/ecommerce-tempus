import {useState} from 'react'
import axios from 'axios'
//redux
import {useSelector, useDispatch} from 'react-redux'
import {updateUserData} from '../../slices/userDataSlice'

export default function Login() {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('legion@gmail.com')
    const [emailError, setEmailError] = useState(null)
    const [password, setPassword] = useState('legion123')
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
        axios.post('/api/admin/login', payload)
        .then(result => {
            if (result.data == 'password is invalid') {
                setPasswordError('password is invalid')
                setPassword('')
            } else if (result.data.status == 'success') {
                //set userData redux
                dispatch(updateUserData(result.data.adminData))
            }
        }).catch(err => console.log(err))
    }

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="p-4 bg-gray-200">
                <h1>Please enter your email and password</h1>

                <input className={`w-full mb-8 p-4 text-xl ${emailError !== null && 'border-2 border-red-500'}`}
                    type="text" placeholder={emailError === null ? "Email" : emailError}
                    value={email} onChange={(e) => setEmail(e.target.value)} />

                <input className={`w-full mb-8 p-4 text-xl ${passwordError !== null && 'border-2 border-red-500'}`}
                    type="text" placeholder={passwordError === null ? "Password" : passwordError}
                    value={password} onChange={(e) => setPassword(e.target.value)} />

                <button className="p-2 rounded-xl text-xl text-gray-200 bg-blue-600" onClick={(e) => login(e)}>Login</button>
            </div>
        </div>
    )
}