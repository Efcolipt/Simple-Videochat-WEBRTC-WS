import React, { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db, storage } from "../firebase"
import { v4 as uuidV4 } from 'uuid'
import { useNavigate, Link } from "react-router-dom"

const Register = () => {
    const [err, setErr] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            displayName: e.target[0].value,
            email: e.target[1].value,
            password: e.target[2].value,
            file: e.target[3].files[0]
        }

        try {
            const res = await createUserWithEmailAndPassword(auth, payload.email, payload.password)
            const storageRef = ref(storage, uuidV4())

            await uploadBytesResumable(storageRef, payload.file).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {
                        await updateProfile(res.user, {
                            displayName: payload.displayName,
                            photoURL: downloadURL,
                        });

                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName: payload.displayName,
                            email: payload.email,
                            photoURL: downloadURL,
                        });

                        await setDoc(doc(db, "userChats", res.user.uid), {});
                        navigate("/");
                    } catch (err) {
                        console.log(err);
                        setErr(true);
                    }
                })
            })

        } catch (e) {
            setErr(e.message)
        }
    }

    return (
        <div className="form">
            <div className='form-wrapper'>
                <span className='form-logo'>LT Meeting</span>
                <span className='form-title'>Регистрация</span>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='Введите имя' required />
                    <input type="email" placeholder='Введите Email' required />
                    <input type="password" placeholder='Введите пароль' required />
                    <label htmlFor="file">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                            <g id="🔍-Product-Icons" stroke="none" strokeWidth="1" fillRule="evenodd">
                                <g id="ic_fluent_image_add_24_regular" fillRule="nonzero">
                                    <path d="M18.75,4 C20.5449254,4 22,5.45507456 22,7.25 L22,18.75 C22,20.5449254 20.5449254,22 18.75,22 L7.25,22 C5.45507456,22 4,20.5449254 4,18.75 L4,12.5018674 C4.47425417,12.6996032 4.97687415,12.842783 5.50009292,12.9235662 L5.5,18.75 C5.5,18.9584012 5.53642824,19.1582941 5.60326447,19.3436585 L11.4257839,13.6429919 C12.2588664,12.8272921 13.5674613,12.7885018 14.4457696,13.5265833 L14.5741754,13.6431221 L20.396372,19.3446658 C20.4634397,19.1590183 20.5,18.9587787 20.5,18.75 L20.5,7.25 C20.5,6.28350169 19.7164983,5.5 18.75,5.5 L12.9235662,5.50009292 C12.842783,4.97687415 12.6996032,4.47425417 12.5018674,4 L18.75,4 Z M12.558795,14.6439914 L12.4752034,14.7147748 L6.66845098,20.4010512 C6.85040089,20.4651384 7.04612926,20.5 7.25,20.5 L18.75,20.5 C18.9534932,20.5 19.1488742,20.4652674 19.330538,20.401407 L13.5246673,14.7148182 C13.259617,14.4552555 12.8501251,14.4316429 12.558795,14.6439914 Z M16.252115,7.5 C17.4959237,7.5 18.50423,8.50830622 18.50423,9.75211499 C18.50423,10.9959237 17.4959237,12.00423 16.252115,12.00423 C15.0083062,12.00423 14,10.9959237 14,9.75211499 C14,8.50830622 15.0083062,7.5 16.252115,7.5 Z M6.5,1 C9.53756612,1 12,3.46243388 12,6.5 C12,9.53756612 9.53756612,12 6.5,12 C3.46243388,12 1,9.53756612 1,6.5 C1,3.46243388 3.46243388,1 6.5,1 Z M16.252115,9 C15.8367333,9 15.5,9.33673335 15.5,9.75211499 C15.5,10.1674966 15.8367333,10.50423 16.252115,10.50423 C16.6674966,10.50423 17.00423,10.1674966 17.00423,9.75211499 C17.00423,9.33673335 16.6674966,9 16.252115,9 Z M6.5,2.9992349 L6.41012437,3.00729057 C6.20603131,3.04433453 6.04509963,3.20526621 6.00805567,3.40935926 L6,3.4992349 L5.99964979,5.9992349 L3.49764979,6 L3.40777416,6.00805567 C3.2036811,6.04509963 3.04274942,6.20603131 3.00570546,6.41012437 L2.99764979,6.5 L3.00570546,6.58987563 C3.04274942,6.79396869 3.2036811,6.95490037 3.40777416,6.99194433 L3.49764979,7 L6.00064979,6.9992349 L6.00110764,9.5034847 L6.00916331,9.59336034 C6.04620728,9.79745339 6.20713895,9.95838507 6.41123201,9.99542903 L6.50110764,10.0034847 L6.59098327,9.99542903 C6.79507633,9.95838507 6.95600801,9.79745339 6.99305197,9.59336034 L7.00110764,9.5034847 L7.00064979,6.9992349 L9.5045655,7 L9.59444113,6.99194433 C9.79853418,6.95490037 9.95946586,6.79396869 9.99650983,6.58987563 L10.0045655,6.5 L9.99650983,6.41012437 C9.95946586,6.20603131 9.79853418,6.04509963 9.59444113,6.00805567 L9.5045655,6 L6.99964979,5.9992349 L7,3.4992349 L6.99194433,3.40935926 C6.95490037,3.20526621 6.79396869,3.04433453 6.58987563,3.00729057 L6.5,2.9992349 Z" id="🎨-Color" />
                                </g>
                            </g>
                        </svg>
                        <span>Добавить аватарку</span>
                    </label>
                    <input type="file" id='file' style={{ display: 'none' }} required />
                    <button>Зарегистрироваться</button>
                    {err.length > 0 && <span className='form-error'>{err}</span>}
                </form>
                <p>Уже есть аккаунт ? <Link to="/login">Login</Link></p>
            </div>
        </div>
    )
}

export default Register