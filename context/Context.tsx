// Context.tsx

import React, { useContext, useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalstorage';

type ValueProp = {
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
};

type ContextProp = {
  children: React.ReactNode;
};

export const AppContext = React.createContext({} as ValueProp); //create the context API

//function body
export default function Context({ children }: ContextProp) {
  const [userIdStorage, setUserIdStorage] = useLocalStorage(
    'userId',
    undefined
  );
  const [userId, setUserId] = useState<string>(userIdStorage);

  useEffect(() => {
    setUserId(userIdStorage);
  }, [userIdStorage]);

  return (
    <AppContext.Provider value={{ userId, setUserId }}>
      {children}
    </AppContext.Provider>
  );
}

export const useGlobalContext = (): ValueProp => {
  return useContext(AppContext);
};
