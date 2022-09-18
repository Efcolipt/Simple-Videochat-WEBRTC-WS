import { createContext, useContext, useReducer } from 'react';
import { AuthContext } from './AuthContext';
import combineIds from '../utils/combineIds';

export const ChatContext = createContext();

export function ChatContextProvider({ children }) {
  const { currentUser } = useContext(AuthContext);
  const INIT_STATE = {
    chatId: 'null',
    user: {},
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case 'CHANGE_USER':
        return {
          user: action.payload,
          chatId: combineIds(currentUser.uid, action.payload.uid),
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INIT_STATE);

  return <ChatContext.Provider value={{ chat: state, dispatch }}>{children}</ChatContext.Provider>;
}
