import React from 'react'
import { useContext } from 'react'
import Chat from '../components/Chat/Chat'
import Sidebar from '../components/Sidebar/Sidebar'
import { ChatContext } from '../context/ChatContext'

const Home = () => {
  const { chat } = useContext(ChatContext)

  return (
    <div className='meeting'>
      <div className="container">
        <Sidebar />
        {chat.chatId !== 'null' && <Chat />}
      </div>
    </div>
  )
}

export default Home