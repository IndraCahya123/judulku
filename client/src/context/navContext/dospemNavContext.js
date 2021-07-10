import { createContext, useReducer } from 'react'

export const DospemNavContext = createContext()

const initialValue = {
  home: true,
  guide: false,
  dospemResponse: false,
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
        dospemResponse: false,
        profile: false,
      }
    case 'GUIDE':
      return {
        ...state,
        home: false,
        guide: true,
        dospemResponse: false,
        profile: false,
      }
    case 'DOSPEM_RES':
      return {
        ...state,
        home: false,
        guide: false,
        dospemResponse: true,
        profile: false,
      }
    case 'PROFILE':
      return {
        ...state,
        home: false,
        guide: false,
        dospemResponse: false,
        profile: true,
      }

    default:
      throw new Error()
  }
}

export const DospemNavContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValue)

  return (
    <DospemNavContext.Provider value={[state, dispatch]}>
      {children}
    </DospemNavContext.Provider>
  )
}
