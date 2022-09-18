import React, { useContext } from 'react';
import { signOut } from 'firebase/auth';
import { auth, frs } from '../../firebase';
import { AuthContext } from '../../context/AuthContext';
import { doc, Timestamp, updateDoc } from 'firebase/firestore'

function Navbar() {
  const { currentUser } = useContext(AuthContext);
  const handleSignOut = () => {

    try {

      updateDoc(doc(frs, "users", currentUser.uid), {
        isOnline: false,
        lastConnected: Timestamp.now(),
      }).then(() => {
        signOut(auth)
      })
    } catch (e) {
      console.log(e)
    }

  }
  return (
    <div className="meeting-sidebar__navbar">
      <div className="meeting-sidebar__navbar-user">
        <img className="meeting-sidebar__navbar-user__img" src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
      </div>
      <button onClick={handleSignOut}>Выйти</button>
    </div>
  );
}

export default Navbar;
