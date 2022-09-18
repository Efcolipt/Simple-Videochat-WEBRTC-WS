import React, { useState } from 'react'
import { useNavigate, Link } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from '../firebase'

const Login = () => {
    const [err, setErr] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            email: e.target[0].value,
            password: e.target[1].value,
        }

        try {
            await signInWithEmailAndPassword(auth, payload.email, payload.password)
            navigate('/')
        } catch (e) {
            setErr(e.message)
        }
    }
    return (
        <div className="form">
            <div className='form-wrapper'>
                <span className='form-logo'>LT Meeting</span>
                <span className='form-title'>Авторизоваться</span>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder='Введите Email' required />
                    <input type="password" placeholder='Введите пароль' required />
                    <button >Войти</button>
                    {err.length > 0 && <span className='form-error'>{err}</span>}
                </form>
                <p>Нет аккаунта ? <Link to="/register">Зарегистрироваться</Link></p>
            </div>
        </div>
    )
}

export default Login