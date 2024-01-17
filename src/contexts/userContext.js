import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext(
  {
    username: '',
    setUsername: (username) => {},
  },
);

export default function UserProvider({ children }) {
  const [username, setUsername] = useState('');

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) throw new Error('useUser must be used within a UserProvider');

  const { username, setUsername } = context;
  return { username, setUsername };
}