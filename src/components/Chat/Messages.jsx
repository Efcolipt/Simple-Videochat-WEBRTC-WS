import { doc, onSnapshot } from 'firebase/firestore'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { ChatContext } from '../../context/ChatContext'
import { db } from '../../firebase'
import Message from './Message'

const Messages = () => {
  const [messages, setMessages] = useState([])
  const { chat } = useContext(ChatContext)

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", chat.chatId), doc => {
      doc.exists() && setMessages(doc.data().messages)
    })

    return () => {
      unsub()
    }
  }, [chat.chatId])

  return (
    <div className='meeting-chat__messages'>
        {messages.map(m => <Message message={m} key={m.id}/>)}
    </div>
  )
}

export default Messages