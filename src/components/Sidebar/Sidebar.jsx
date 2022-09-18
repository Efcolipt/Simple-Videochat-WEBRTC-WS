import { doc, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { db } from '../../firebase'
import Navbar from './Navbar'
import SearchBar from './SearchBar'
import Chats from './Chats'
import { ChatContext } from '../../context/ChatContext'

const Sidebar = () => {
  const [chats, setChats] = useState([])
  const { currentUser } = useContext(AuthContext)
  const { dispatch } = useContext(ChatContext)

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), doc => {
        console.log(doc)
        setChats(doc.data())
      })
      

      return () => {
        unsub()
      }
    }


    currentUser.uid && getChats()
  }, [currentUser.uid])


  const handleSelect = (info) => {
    dispatch({ type: "CHANGE_USER", payload: info })
  }

  return (
    <div className='meeting-sidebar'>
        <Navbar />
        <SearchBar />
        <Chats chats={chats} handleSelect={handleSelect}/>
    </div>
  )
}

export default Sidebar