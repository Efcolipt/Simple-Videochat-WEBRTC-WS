import React, { useContext } from 'react'
import { signOut } from "firebase/auth"
import { auth } from '../../firebase'
import { AuthContext } from '../../context/AuthContext'

const Navbar = () => {
  const {currentUser} = useContext(AuthContext)


  return (
    <div className='meeting-sidebar__navbar'>
        <div className="meeting-sidebar__navbar-user">
            <img className='meeting-sidebar__navbar-user__img' src={currentUser.photoURL} alt="" />
            <span>{currentUser.displayName}</span>
        </div>
        <button onClick={() => signOut(auth)}>Выйти</button>
    </div>
  )
}

export default Navbar