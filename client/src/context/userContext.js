import { createContext, useReducer } from 'react'

export const UserContext = createContext()

const initialValue = {
  user: null,
  loginStatus: false,
}

const reducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case 'LOGIN':
    case 'REGISTER':
    case 'AUTH_SUCCESS':
      localStorage.setItem('token', payload.user.token)

      return {
        ...state,
        user: payload.user,
        loginStatus: true,
      }

    case 'LOGOUT':
    case 'AUTH_ERROR':
      localStorage.removeItem('token')

      return {
        ...state,
        user: null,
        loginStatus: false,
      }

    default:
      throw new Error()
  }
}

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValue)

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  )
}
