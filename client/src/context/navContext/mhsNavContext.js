import { createContext, useReducer } from 'react'

export const MhsNavContext = createContext()

const initialValue = {
  home: true,
  guide: false,
  judul: false,
  profile: false,
}

const reducer = (state, action) => {
  const { type } = action

  switch (type) {
    case 'HOME':
      return {
        ...state,
        home: true,
        guide: false,
        judul: false,
        profile: false,
      }
    case 'GUIDE':
      return {
        ...state,
        home: false,
        guide: true,
        judul: false,
        profile: false,
      }
    case 'JUDUL':
      return {
        ...state,
        home: false,
        guide: false,
        judul: true,
        profile: false,
      }
    case 'PROFILE':
      return {
        ...state,
        home: false,
        guide: false,
        judul: false,
        profile: true,
      }

    default:
      throw new Error()
  }
}

export const MhsNavContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValue)

  return (
    <MhsNavContext.Provider value={[state, dispatch]}>
      {children}
    </MhsNavContext.Provider>
  )
}
