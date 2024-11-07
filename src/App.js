import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { refreshDetails } from './external/messagebox/service';
import LoginModal from './components/LoginModal';
import ChatWindow from './components/ChatWindow';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (user) => {
    setUsername(user);
    setIsLoggedIn(true);
  };

  useEffect(() => {
    const asyncCall = async() => {
      const { error, userDetails } = await refreshDetails();

      if (!error) {
        handleLogin(userDetails.username);
      }
    };

    asyncCall();
  }, []);

  return (
    <AppContainer>
      {!isLoggedIn ? (
        <LoginModal onLogin={handleLogin} />
      ) : (
        <ChatWindow username={username} />
      )}
    </AppContainer>
  );
}

const AppContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f2f5;
`;

export default App;
