import './App.css';
import Login from './pages/Login'
import Chat from './pages/Chat'
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthContext from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  const [message, setMessage] = useState('');
  const [messageReceived, setMessageReceived] = useState('s');


  useEffect(() => {

  }, []);

  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/chat' element={<ProtectedRoute></ProtectedRoute>} >
          <Route path="" element={<Chat />} />
        </Route>
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