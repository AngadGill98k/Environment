import logo from './logo.svg';
import './App.css';
import { useEffect, useRef,useState } from 'react';
import { io } from 'socket.io-client';
import { useDispatch,useSelector } from 'react-redux';
import Navbar from './components/Navbar/Navbar';
import Content from './components/Content/Content';
import { useNavigate } from 'react-router-dom';
function App() {

  let [socket, setSocket] = useState(null);
  let dispatch=useDispatch();
  let naviagter=useNavigate();
  let token = useSelector((state) => state.token);
  useEffect(() => {
    const newSocket = io("http://localhost:3001", {
      autoConnect: false,
    });
    console.log("token is ",token)
    setSocket(newSocket);
    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);


  useEffect(() => {
    if (socket) {
    
      socket.on("connect", () => {
        console.log("✅ Connected to socket:", socket.id);
      });

      socket.on("disconnect", () => {
        console.log("❌ Disconnected from socket");
      });
    }
  }, [socket]);



  return (
    <>
      <div className="nav_con">
            <Navbar/>
      </div>

      <button onClick={()=>naviagter("/content")}>content</button>
   
      
      
    </>
  );
}

export default App;
