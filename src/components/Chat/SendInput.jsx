import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore'
import React, { useContext } from 'react'
import { useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'
import { frs, storage } from '../../firebase'
import { v4 as uuidV4 } from "uuid"
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import LoaderData from '../LoaderData'

const SendInput = () => {
    const [text, setText] = useState('')
    const [file, setFile] = useState('')
    const [loader, setLoader] = useState(false)

    const { currentUser } = useContext(AuthContext)
    const { chat } = useContext(ChatContext)


    const handleEnter = async (e) => {
        e.code === "Enter" && await handleSend()
    }

    const handleSend = async () => {

        if (text.trim().length >= 1 || file) {

            try {
                setLoader(true)
                if (file) {
                    const storageRef = ref(storage, uuidV4())

                    await uploadBytesResumable(storageRef, file).then(() => {
                        getDownloadURL(storageRef).then(async (downloadURL) => {
                            try {
                                await updateDoc(doc(frs, "chats", chat.chatId), {
                                    messages: arrayUnion({
                                        id: uuidV4(),
                                        text,
                                        senderId: currentUser.uid,
                                        date: Timestamp.now(),
                                        img: downloadURL
                                    })
                                })
                            } catch (e) {
                                console.log(e);
                            }
                        })
                    })

                } else {
                    await updateDoc(doc(frs, "chats", chat.chatId), {
                        messages: arrayUnion({
                            id: uuidV4(),
                            text,
                            senderId: currentUser.uid,
                            date: Timestamp.now()
                        })
                    })
                }

                await updateDoc(doc(frs, "userChats", currentUser.uid), {
                    [chat.chatId + ".lastMessage"]: {
                        text,
                    },
                    [chat.chatId + ".date"]: serverTimestamp()
                })

                await updateDoc(doc(frs, "userChats", chat.user.uid), {
                    [chat.chatId + ".lastMessage"]: {
                        text,
                    },
                    [chat.chatId + ".date"]: serverTimestamp()
                })

            } catch (e) {
                console.log(e)
            } finally {
                setText('')
                setFile('')
                setLoader(false)
            }
        }


    }
    return (
        <div className='meeting-chat__input'>
            <input type="text" placeholder='Напишите что нибудь' onKeyDown={handleEnter} value={text} onChange={e => setText(e.target.value)} />
            <div className="meeting-chat__input-actions">
                <input type="file" id="file" style={{ display: 'none' }} onChange={e => setFile(e.target.files[0])} />
                <label htmlFor="file">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 36 36" version="1.1" preserveAspectRatio="xMidYMid meet">
                        <path className="clr-i-outline clr-i-outline-path-1" d="M8.42,32.6A6.3,6.3,0,0,1,4,30.79l-.13-.13A6.2,6.2,0,0,1,2,26.22,6.77,6.77,0,0,1,4,21.4L19.5,6.07a8.67,8.67,0,0,1,12.15-.35A8,8,0,0,1,34,11.44a9,9,0,0,1-2.7,6.36L17.37,31.6A1,1,0,1,1,16,30.18L29.89,16.38A7,7,0,0,0,32,11.44a6,6,0,0,0-1.76-4.3,6.67,6.67,0,0,0-9.34.35L5.45,22.82A4.78,4.78,0,0,0,4,26.22a4.21,4.21,0,0,0,1.24,3l.13.13a4.64,4.64,0,0,0,6.5-.21L25.22,15.94A2.7,2.7,0,0,0,26,14a2.35,2.35,0,0,0-.69-1.68,2.61,2.61,0,0,0-3.66.13l-9.2,9.12a1,1,0,1,1-1.41-1.42L20.28,11a4.62,4.62,0,0,1,6.48-.13A4.33,4.33,0,0,1,28,14a4.68,4.68,0,0,1-1.41,3.34L13.28,30.58A6.91,6.91,0,0,1,8.42,32.6Z" />
                        <rect x="0" y="0" width="24" height="24" fillOpacity="0" />
                    </svg>
                    {file && <span>1</span>}
                </label>
                <button onClick={handleSend}>
                    {
                        loader 
                            ?<LoaderData />
                            : <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" viewBox="0 0 32 32" id="icon"><path d="M27.45,15.11l-22-11a1,1,0,0,0-1.08.12,1,1,0,0,0-.33,1L7,16,4,26.74A1,1,0,0,0,5,28a1,1,0,0,0,.45-.11l22-11a1,1,0,0,0,0-1.78Zm-20.9,10L8.76,17H18V15H8.76L6.55,6.89,24.76,16Z" /></svg>
                    }
                </button>
            </div>
        </div>
    )
}

export default SendInput