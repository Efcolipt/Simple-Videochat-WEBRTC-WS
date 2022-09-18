import React from 'react'
import ChatItem from './ChatItem'

const Chats = ({ chats = [], handleSelect = () => {} }) => {
  return (
    <div className='meeting-sidebar__chatlist'>
        { Object.entries(chats)?.sort((a,b) => a[1].date - b[1].date).map(chat => <ChatItem photo={chat[1]?.info?.photoURL} displayName={chat[1]?.info?.displayName} key={chat[0]} lastMessage={chat[1]?.lastMessage?.text} onClick={() => handleSelect(chat[1].info)} />) }
    </div>
  )
}

export default Chats