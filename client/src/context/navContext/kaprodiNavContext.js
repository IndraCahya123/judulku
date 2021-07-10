import { createContext, useReducer } from "react";

export const KaprodiNavContext = createContext();

const initialValue = {
  home: true,
  guide: false,
  kaprodiResponse: false,
  profile: false,
};

const reducer = (state, action) => {
  const { type } = action;

  switch (type) {
    case "HOME":
      return {
        ...state,
        home: true,
        guide: false,
        kaprodiResponse: false,
        profile: false,
      };
    case "GUIDE":
      return {
        ...state,
        home: false,
        guide: true,
        kaprodiResponse: false,
        profile: false,
      };
    case "KAPRODI_RES":
      return {
        ...state,
        home: false,
        guide: false,
        kaprodiResponse: true,
        profile: false,
      };
    case "PROFILE":
      return {
        ...state,
        home: false,
        guide: false,
        kaprodiResponse: false,
        profile: true,
      };

    default:
      throw new Error();
  }
};

export const KaprodiNavContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValue);

  return (
    <KaprodiNavContext.Provider value={[state, dispatch]}>
      {children}
    </KaprodiNavContext.Provider>
  );
};
