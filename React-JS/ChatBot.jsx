import React, { useState } from 'react';
import axios from 'axios';
import "./chatbot.css";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  // Function to handle sending a message
  const handleSendMessage = async () => {
    if (inputMessage.trim() !== '') {
      const updatedMessages = [...messages, { text: inputMessage, sender: 'user' }];
      setMessages(updatedMessages);

      try {
        // Send the user's message to the backend for processing
        const response = await axios.post('http://localhost:5000/predict_text', { text: inputMessage });
        
        // Extract the category from the response and add it as a bot reply
        const botReply = { text: response.data.category, sender: 'bot' };
        setMessages(prevMessages => [...prevMessages, botReply]);
      } catch (error) {
        console.error('Error processing message:', error);
        // Handle error if needed
      }

      // Clear the input message after sending
      setInputMessage('');
    }
  };

  // Function to handle pressing Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBot;
