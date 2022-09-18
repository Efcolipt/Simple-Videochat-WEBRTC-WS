import React from 'react'

const UserChat = ({ photo, displayName, lastMessage = null, onClick = () => { } }) => {
  return (
    <div className="meeting-sidebar__chatlist-user" onClick={onClick}>
      <img src={photo} alt="" />
      <div className="meeting-sidebar__chatlist-user__info">
        <span>{displayName}</span>
        {lastMessage && <p>{lastMessage}</p>}
      </div>
    </div>
  )
}

export default UserChat