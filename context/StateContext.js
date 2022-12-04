import React, { createContext, useContext, useState } from 'react';
const Context = createContext();
export const StateContext = ({ children }) => {
  const [showSideBar, setShowSideBar] = useState(false);
  const [searchTitle, setSearchTitle] = useState();
  const [searchItem, setSearchItem] = useState();
  const [selectedId, setSelectedId] = useState('');
  return (
    <Context.Provider
      value={{
        showSideBar,
        setShowSideBar,
        searchItem,
        setSearchItem,
        searchTitle,
        setSearchTitle,
        selectedId,
        setSelectedId,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
