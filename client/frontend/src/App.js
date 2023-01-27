import './App.css';
import Login from './pages/Login'
import Chat from './pages/Chat'
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

const socket = io.connect('http://localhost:3001');

function App() {
  const [message, setMessage] = useState('');
  const [messageReceived, setMessageReceived] = useState('s');
  const sendMessage = () => {
    socket.emit('send_message', { message });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);

  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/chat' element={<Chat/>} />
      </Routes>
    </>
    
    /*
    <div className="App">
      <input placeholder="Message..." onChange={(event) => {
        setMessage(event.target.value);
      }}/>
      <button onClick={sendMessage}>Send Message</button>
      <h1>Message:</h1>
      {messageReceived}
    </div>
    */
  )
}

export default App;