import React, { useEffect } from 'react';

const useLocalStorage = (name: string, val: any) => {
  useEffect(() => {
    localStorage.setItem(name, JSON.stringify(val));
  }, [name, val]);

  return JSON.parse(localStorage.getItem(name) as string);
};

export default useLocalStorage;
