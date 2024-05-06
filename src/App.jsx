import React, { useState, useEffect, useRef } from 'react';
// import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import './App.css';

const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];

function App() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // State for Emoji Picker visibility
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = () => {
    if (inputText.trim() !== '') {
      const randomUser = user_list[Math.floor(Math.random() * user_list.length)];
      const newMessage = {
        user: randomUser,
        text: inputText,
        likes: 0
      };
      setMessages([...messages, newMessage]); // Add new message to the end of the array
      setInputText('');
    }
  };

  const handleLike = (index) => {
    const updatedMessages = [...messages];
    updatedMessages[index].likes += 1;
    setMessages(updatedMessages);
  };

  const handleEmoji = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent default form submission
      handleSend(); // Call handleSend function when Enter key is pressed
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="header">Company Channel</h1>
        <h2 className="subheader">Members: {user_list.join(', ')}</h2>
      </header>
      <div className="message-thread">
        {messages.map((message, index) => (
          <div className="message" key={index}>
            <span className="user">{message.user}</span>
            <span className="text">{message.text}</span>
            <button className="like-button" onClick={() => handleLike(index)}>❤️ Like ({message.likes})</button>
          </div>
        ))}
        <div ref={endOfMessagesRef} />
      </div>
      <div className="input-box">
        <button className="emoji-button" onClick={handleEmoji}>😊</button>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown} // Add event listener for Enter key
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
        {showEmojiPicker && (
          <Picker
            onSelect={(emoji) => {
              setInputText(inputText + emoji.native);
              setShowEmojiPicker(false);
            }}
            emojiSize={24}
            title="Pick your emoji…"
            emoji="point_up"
            style={{ position: 'absolute', bottom: '50px', right: '10px' }}
          />
        )}
      </div>
    </div>
  );
}

export default App;
