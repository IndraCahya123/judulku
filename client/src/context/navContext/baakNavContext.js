import { createContext, useReducer } from "react";

export const BaakNavContext = createContext();

const initialValue = {
  home: true,
  print: false,
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
        print: false,
        profile: false,
      };
    case "GUIDE":
      return {
        ...state,
        home: false,
        guide: true,
        print: false,
        profile: false,
      };
    case "PRINT":
      return {
        ...state,
        home: false,
        guide: false,
        print: true,
        profile: false,
      };
    case "PROFILE":
      return {
        ...state,
        home: false,
        guide: false,
        print: false,
        profile: true,
      };

    default:
      throw new Error();
  }
};

export const BaakNavContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValue);

  return (
    <BaakNavContext.Provider value={[state, dispatch]}>
      {children}
    </BaakNavContext.Provider>
  );
};
