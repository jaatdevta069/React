import { createContext, useState } from "react";

export const authContext = createContext('');

export const ContextProvider = ({ child }) => {
  const [auth, setAuth] = useState('');
  return (
    <authContext.Provider value={{ auth, setAuth }}>
      {child}
    </authContext.Provider>
  );
};