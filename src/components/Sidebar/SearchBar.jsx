import React, { useContext, useState } from 'react'
import { db } from '../../firebase'
import { collection, query, where, getDoc, getDocs } from "firebase/firestore"
import ChatItem from './ChatItem'
import { AuthContext } from '../../context/AuthContext'
import { doc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import combineIds from '../../utils/combineIds'

const SearchBar = () => {
  const [email, setEmail] = useState('')
  const [user, setUser] = useState(null)
  const [err, setErr] = useState('')

  const { currentUser } = useContext(AuthContext)

  const handleSearch = async () => {
    try {
      const q = query(
        collection(db, "users"),
        where("email", "==", email)
      )


      const querySnapshot = await getDocs(q)
      querySnapshot.forEach(doc => {
        setUser(doc.data())
      });


      if (!user) setErr('Никто не найден')
      else setErr('')
    } catch (e) {
      setErr(e.message)
    }
  }

  const handleEnter = (e) => {
    e.code === "Enter" && handleSearch()
  }

  const handleSelect = async () => {
    const combinedId = combineIds(currentUser.uid, user.uid)
    try {
      const res = await getDoc(doc(db, "chats", combinedId))

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] })

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".info"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
          },
          [combinedId + ".date"]: serverTimestamp()
        })

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".info"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          },
          [combinedId + ".date"]: serverTimestamp()
        })

      }
    } catch (e) {
      setErr(e.message)
    } finally {
      setUser(null)
      setEmail("")
    }
  }

  return (
    <div className='meeting-sidebar__search'>
      <div className="meeting-sidebar__search-form">
        <input type="email" placeholder='Найти по email' onKeyDown={handleEnter} value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      {err.length > 0 && <span className='meeting-sidebar__search-error'>{err}</span>}
      {user && <ChatItem photo={user.photoURL} displayName={user.displayName} onClick={handleSelect} />}
    </div>
  )
}

export default SearchBar