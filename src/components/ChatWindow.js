import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getMyMessages, sendMessage } from '../external/messagebox/service';

function ChatWindow({ username }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      sendMessage(newMessage.trim())
        .then(_ => getMyMessages())
        .then(messages => {
          setMessages(messages);
          setNewMessage('');
        });
    }
  };

  useEffect(() => {
    getMyMessages().then(messages => setMessages(messages));
  }, []);

  return (
    <ChatContainer>
      <ChatHeader>
        <h2>Chat Room</h2>
        <span>Welcome, {username}!</span>
      </ChatHeader>
      <MessagesContainer>
        {messages.map((message) => (
          <MessageBubble key={message.uuid} $isOwnMessage={message.subtype === 'UserMessage'}>
            <MessageHeader>
              <span>{message.subtype === 'UserMessage' ? username : 'Service'}</span>
              <time>{new Date(message.createdAt).toLocaleTimeString('en-GB', {hour: '2-digit', minute:'2-digit'})}</time>
            </MessageHeader>
            <MessageText>{message.content}</MessageText>
          </MessageBubble>
        ))}
      </MessagesContainer>

      <MessageForm onSubmit={handleSubmit}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </MessageForm>
    </ChatContainer>
  );
}

const ChatContainer = styled.div`
  width: 100%;
  max-width: 800px;
  height: 80vh;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  margin: 2rem;
`;

const ChatHeader = styled.div`
  padding: 1rem;
  background: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
  border-radius: 8px 8px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MessageBubble = styled.div`
  max-width: 70%;
  padding: 0.8rem;
  border-radius: 8px;
  background: ${props => props.$isOwnMessage ? '#0084ff' : '#e9ecef'};
  color: ${props => props.$isOwnMessage ? 'white' : 'black'};
  align-self: ${props => props.$isOwnMessage ? 'flex-end' : 'flex-start'};
`;

const MessageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  margin-bottom: 0.4rem;
  gap: 0.5rem;
`;

const MessageText = styled.p`
  margin: 0;
  word-wrap: break-word;
`;

const MessageForm = styled.form`
  display: flex;
  padding: 1rem;
  gap: 0.5rem;
  border-top: 1px solid #dee2e6;

  input {
    flex: 1;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }

  button {
    padding: 0.8rem 1.5rem;
    background-color: #0084ff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #0073e6;
    }
  }
`;

export default ChatWindow;
