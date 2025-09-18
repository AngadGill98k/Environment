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

      <div className='header'>
        <p style={{color:"#5a5a5aff",margin:"0px",padding:"0px",width:"50%",textAlign:"justify",fontWeight:"bolder",fontSize:"25px"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus 
          id ipsam sapiente ex quasi et nostrum suscipit 
          culpa exercitationem eos? Eius itaque 
          deserunt officiis, magnam 
          doloremque earum. Neque, animi nam?  <button onClick={()=>naviagter("/content")}> Learn More</button></p>
          
      </div>
      
   
      <div className='about_con'>
        <div>
          <h2>About Us</h2>
        </div>
      </div>
      
    </>
  );
}

export default App;
