import './App.css';
import Login from './pages/Login'
import Chat from './pages/Chat'
import About from './pages/About';
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
        <Route path='/about' element={<About/>} />
        <Route path='/chat' element={<ProtectedRoute></ProtectedRoute>} >
          <Route path="" element={<Chat />} />
        </Route>
      </Routes>
    </>
  )
}

export default App;