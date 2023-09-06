import { useState, useEffect } from 'react';

const useLocalStorage = async (key: string, defaultValue: any) => {
  const [value, setValue] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(key) || String(defaultValue));
    } catch (error) {
      return defaultValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};

export default useLocalStorage;
