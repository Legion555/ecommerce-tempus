import { useState } from "react"
import axios from 'axios'



export default function Register({setView}) {
    const [username, setUsername] = useState('')
    const [usernameError, setUsernameError] = useState(null)
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState(null)
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState(null)

    const register = (e) => {
        e.preventDefault()

        //reset errors
        setUsernameError(null); setEmailError(null); setPasswordError(null);

        //validation
        if (username.length == 0) {setUsernameError('Too short'); return setUsername('')}
        if (email.length == 0) {setEmailError('Too short'); return setEmail('')}
        if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email)) {setEmailError('invalid email'); return setEmail('')}
        if (password.length == 0) {setPasswordError('Too short'); return setPassword('')}

        const payload = {
            username: username,
            email: email,
            password: password
        }

        axios.post('/api/users/register', payload)
        .then(result => {
            if (result.data === 'username already exists') {
                setUsernameError('username already exists');
                return setUsername('');
            } else if (result.data === 'email already exists') {
                setEmailError('Email already exists');
                return setEmail('');
            }
            setView('login');
            console.log('Successfully registered');
        }).catch(err => console.log(err))
    }

    return (
        <div className="w-full h-full p-8 md:p-16 text-center bg-gray-100">
            <h1 className="mb-8 text-3xl md:text-6xl text-gray-700">SA Boerewors</h1>
            <p className="mb-16 text-2xl md:text-4xl text-gray-500">Sign up for free</p>
            <form className="mb-16">
                <input className={`w-full mb-8 p-4 text-xl ${usernameError !== null && 'border-2 border-red-500'}`}
                    type="text" required placeholder={usernameError === null ? "Username" : usernameError}
                    value={username} onChange={(e) => setUsername(e.target.value)} />

                <input className={`w-full mb-8 p-4 text-xl ${emailError !== null && 'border-2 border-red-500'}`}
                    type="email" required placeholder={emailError === null ? "Email" : emailError}
                    value={email} onChange={(e) => setEmail(e.target.value)} />

                <input className={`w-full mb-8 p-4 text-xl ${passwordError !== null && 'border-2 border-red-500'}`}
                    type="text" required placeholder={passwordError === null ? "Password" : passwordError}
                    value={password} onChange={(e) => setPassword(e.target.value)} />

                <button className="w-full p-4 text-4xl text-gray-100 bg-blue-800 hover:bg-blue-600 transition ease-in-out duration-150" onClick={(e) => register(e)}>Sign up</button>
            </form>
            <p className="text-xl md:text-2xl">Don't have an account? <span className="font-bold cursor-pointer" onClick={() => setView('login')}>Sign up</span></p>
        </div>
    )
}