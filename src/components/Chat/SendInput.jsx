import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore'
import React, { useContext } from 'react'
import { useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'
import { db, storage } from '../../firebase'
import { v4 as uuidV4 } from "uuid"
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

const SendInput = () => {
    const [text, setText] = useState('')
    const [file, setFile] = useState('')
    
  const { currentUser } = useContext(AuthContext)
  const { chat } = useContext(ChatContext)

  const handleEnter = async (e) => {
    e.code === "Enter" && await handleSend()
  }
    
  const handleSend = async () => {

    if(text.trim().length < 1) return

    try{
        if(file) {
            const storageRef = ref(storage, uuidV4())
            const uploadTask = uploadBytesResumable(storageRef, file)
    
                uploadTask.on((err) => {
                    // setErr(true)
                }, () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => {
                        await updateDoc(doc(db, "chats", chat.chatId), {
                            messages: arrayUnion({
                                id: uuidV4(),
                                text,
                                senderId: currentUser.uid,
                                date: Timestamp.now(),
                                img: downloadUrl
                            })
                        })
                    })
                })
    
        } else {
            await updateDoc(doc(db, "chats", chat.chatId), {
                messages: arrayUnion({
                    id: uuidV4(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now()
                })
            })
        }
    
        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [chat.chatId + ".lastMessage"]: {
                text,
            },
            [chat.chatId + ".date"]: serverTimestamp()
        })
    
        await updateDoc(doc(db, "userChats", chat.user.uid), {
            [chat.chatId + ".lastMessage"]: {
                text,
            },
            [chat.chatId + ".date"]: serverTimestamp()
        })

    } catch (e) {
        console.log(e)
    }


    setText('')
    setFile('')
  }
    return (
        <div className='meeting-chat__input'>
            <input type="text" placeholder='Напишите что нибудь' onKeyDown={handleEnter} value={text} onChange={e => setText(e.target.value)}/>
            <div className="meeting-chat__input-actions">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                    <g id="🔍-Product-Icons" stroke="none" strokeWidth="1" fillRule="evenodd">
                        <g id="ic_fluent_image_add_24_regular" fillRule="nonzero">
                            <path d="M18.75,4 C20.5449254,4 22,5.45507456 22,7.25 L22,18.75 C22,20.5449254 20.5449254,22 18.75,22 L7.25,22 C5.45507456,22 4,20.5449254 4,18.75 L4,12.5018674 C4.47425417,12.6996032 4.97687415,12.842783 5.50009292,12.9235662 L5.5,18.75 C5.5,18.9584012 5.53642824,19.1582941 5.60326447,19.3436585 L11.4257839,13.6429919 C12.2588664,12.8272921 13.5674613,12.7885018 14.4457696,13.5265833 L14.5741754,13.6431221 L20.396372,19.3446658 C20.4634397,19.1590183 20.5,18.9587787 20.5,18.75 L20.5,7.25 C20.5,6.28350169 19.7164983,5.5 18.75,5.5 L12.9235662,5.50009292 C12.842783,4.97687415 12.6996032,4.47425417 12.5018674,4 L18.75,4 Z M12.558795,14.6439914 L12.4752034,14.7147748 L6.66845098,20.4010512 C6.85040089,20.4651384 7.04612926,20.5 7.25,20.5 L18.75,20.5 C18.9534932,20.5 19.1488742,20.4652674 19.330538,20.401407 L13.5246673,14.7148182 C13.259617,14.4552555 12.8501251,14.4316429 12.558795,14.6439914 Z M16.252115,7.5 C17.4959237,7.5 18.50423,8.50830622 18.50423,9.75211499 C18.50423,10.9959237 17.4959237,12.00423 16.252115,12.00423 C15.0083062,12.00423 14,10.9959237 14,9.75211499 C14,8.50830622 15.0083062,7.5 16.252115,7.5 Z M6.5,1 C9.53756612,1 12,3.46243388 12,6.5 C12,9.53756612 9.53756612,12 6.5,12 C3.46243388,12 1,9.53756612 1,6.5 C1,3.46243388 3.46243388,1 6.5,1 Z M16.252115,9 C15.8367333,9 15.5,9.33673335 15.5,9.75211499 C15.5,10.1674966 15.8367333,10.50423 16.252115,10.50423 C16.6674966,10.50423 17.00423,10.1674966 17.00423,9.75211499 C17.00423,9.33673335 16.6674966,9 16.252115,9 Z M6.5,2.9992349 L6.41012437,3.00729057 C6.20603131,3.04433453 6.04509963,3.20526621 6.00805567,3.40935926 L6,3.4992349 L5.99964979,5.9992349 L3.49764979,6 L3.40777416,6.00805567 C3.2036811,6.04509963 3.04274942,6.20603131 3.00570546,6.41012437 L2.99764979,6.5 L3.00570546,6.58987563 C3.04274942,6.79396869 3.2036811,6.95490037 3.40777416,6.99194433 L3.49764979,7 L6.00064979,6.9992349 L6.00110764,9.5034847 L6.00916331,9.59336034 C6.04620728,9.79745339 6.20713895,9.95838507 6.41123201,9.99542903 L6.50110764,10.0034847 L6.59098327,9.99542903 C6.79507633,9.95838507 6.95600801,9.79745339 6.99305197,9.59336034 L7.00110764,9.5034847 L7.00064979,6.9992349 L9.5045655,7 L9.59444113,6.99194433 C9.79853418,6.95490037 9.95946586,6.79396869 9.99650983,6.58987563 L10.0045655,6.5 L9.99650983,6.41012437 C9.95946586,6.20603131 9.79853418,6.04509963 9.59444113,6.00805567 L9.5045655,6 L6.99964979,5.9992349 L7,3.4992349 L6.99194433,3.40935926 C6.95490037,3.20526621 6.79396869,3.04433453 6.58987563,3.00729057 L6.5,2.9992349 Z" id="🎨-Color" />
                        </g>
                    </g>
                </svg>
                <input type="file" id="file" style={{ display: 'none' }} value={file} onChange={e => setFile(e.target.files[0])}/>
                <label htmlFor="file">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 36 36" version="1.1" preserveAspectRatio="xMidYMid meet">

                        <path className="clr-i-outline clr-i-outline-path-1" d="M8.42,32.6A6.3,6.3,0,0,1,4,30.79l-.13-.13A6.2,6.2,0,0,1,2,26.22,6.77,6.77,0,0,1,4,21.4L19.5,6.07a8.67,8.67,0,0,1,12.15-.35A8,8,0,0,1,34,11.44a9,9,0,0,1-2.7,6.36L17.37,31.6A1,1,0,1,1,16,30.18L29.89,16.38A7,7,0,0,0,32,11.44a6,6,0,0,0-1.76-4.3,6.67,6.67,0,0,0-9.34.35L5.45,22.82A4.78,4.78,0,0,0,4,26.22a4.21,4.21,0,0,0,1.24,3l.13.13a4.64,4.64,0,0,0,6.5-.21L25.22,15.94A2.7,2.7,0,0,0,26,14a2.35,2.35,0,0,0-.69-1.68,2.61,2.61,0,0,0-3.66.13l-9.2,9.12a1,1,0,1,1-1.41-1.42L20.28,11a4.62,4.62,0,0,1,6.48-.13A4.33,4.33,0,0,1,28,14a4.68,4.68,0,0,1-1.41,3.34L13.28,30.58A6.91,6.91,0,0,1,8.42,32.6Z" />
                        <rect x="0" y="0" width="24" height="24" fillOpacity="0" />
                    </svg>
                </label>
                <button onClick={handleSend}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" viewBox="0 0 32 32" id="icon"><path d="M27.45,15.11l-22-11a1,1,0,0,0-1.08.12,1,1,0,0,0-.33,1L7,16,4,26.74A1,1,0,0,0,5,28a1,1,0,0,0,.45-.11l22-11a1,1,0,0,0,0-1.78Zm-20.9,10L8.76,17H18V15H8.76L6.55,6.89,24.76,16Z" /></svg>
                </button>
            </div>
        </div>
    )
}

export default SendInput