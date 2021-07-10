import { createContext, useReducer } from 'react'

export const AdminNavContext = createContext()

const initialValue = {
  home: true,
  user: false,
  kriteria: false,
  profile: false,
}

const reducer = (state, action) => {
  const { type } = action

  switch (type) {
    case 'HOME':
      return {
        ...state,
        home: true,
        user: false,
        kriteria: false,
        profile: false,
      }
    case 'USER_DATA':
      return {
        ...state,
        home: false,
        user: true,
        kriteria: false,
        profile: false,
      }
    case 'KRITERIA_DATA':
      return {
        ...state,
        home: false,
        user: false,
        kriteria: true,
        profile: false,
      }
    case 'PROFILE':
      return {
        ...state,
        home: false,
        user: false,
        kriteria: false,
        profile: true,
      }

    default:
      throw new Error()
  }
}

export const AdminNavContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValue)

  return (
    <AdminNavContext.Provider value={[state, dispatch]}>
      {children}
    </AdminNavContext.Provider>
  )
}
