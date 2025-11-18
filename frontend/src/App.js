import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './components/Navbar/Navbar';
import Content from './components/Content/Content';
import { useNavigate } from 'react-router-dom';
function App() {

  let [socket, setSocket] = useState(null);
  let dispatch = useDispatch();
  let naviagter = useNavigate();
  let token = useSelector((state) => state.token);
  useEffect(() => {
    const newSocket = io("http://localhost:3001", {
      autoConnect: false,
    });
    console.log("token is ", token)
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
        <Navbar />
      </div>

      <div className='header'>
        <p style={{ color: "#5a5a5aff", margin: "0px", padding: "0px", width: "50%", textAlign: "justify", fontWeight: "bolder", fontSize: "25px" }}>
          Curious about the Earth? Let’s explore it together.
Discover how our actions shape the planet — and how small changes can make a big impact.<button onClick={() => naviagter("/content")}> Learn More</button></p>

      </div>


      <div className='about_con'>
        <div style={{ padding: "10px", boxSizing: "border-box",width:"50%" }}>
          <h2 style={{ fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif" }}>About Us</h2>
          <p className='AboutText'>Welcome to EnviroHub, a platform dedicated to spreading awareness and knowledge about environmental issues that impact our planet — including soil, water, and air pollution. Our mission is to educate, inspire, and empower individuals to understand the challenges facing our environment through well-researched information, case studies, and real-world examples.

            At WebsiteName, we go beyond just sharing facts — we’re building a community hub where users can upload their own research papers, exchange ideas, and contribute to collective learning. Whether you're a student, researcher, or simply an eco-conscious individual, our platform provides a space to collaborate and make a difference.
            We also value your voice. Users are encouraged to share
            feedback and suggestions to help us grow and
            improve. Together, we can foster awareness,
            promote sustainability, and take meaningful
            steps toward a cleaner, healthier planet.</p>
        </div>


        <img style={{height:"100%",width:"50%",objectFit:"cover"}} src='/Gemini_Generated_Image_hpg0brhpg0brhpg0-removebg-preview.png' alt='logo' className='logoimg' />



      </div>


      {/* <div style={{ display: "flex", height: "30vh", width: "100%", boxSizing: "border-box", padding: "10px" }}>
        <img src="/Hara-Jevan-logo.png" alt="about us" style={{ width: "30%", height: "30%", objectFit: "contain" }} />
        <img src="/logo-light-2.webp" alt="about us" style={{ width: "30%", height: "30%", objectFit: "contain" }} />
        <img src="/cropped-Earth5R-new-logo-1-qldxooc7lzoxz8gr0jz5yg6km7ohkzf6znc5t4238o.png" alt="about us" style={{ width: "30%", height: "30%", objectFit: "cover" }} />
      </div> */}

      <div style={{ backgroundColor: "#f0f0f0", boxSizing: "border-box", width: "100vw" }}>
        <h3 style={{ fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",  margin: "0px" }}>Contact Us</h3>
        <div style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
      }}>
        {/* Email */}
        <div style={{ width: "33%", minWidth: "250px" }}>
          <h3>📧 Email</h3>
          <p>For general inquiries, collaborations, or research uploads, reach us at:</p>
          <p><strong>support@websitename.com</strong></p>
        </div>

        {/* Office */}
        <div style={{ width: "33%", minWidth: "250px" }}>
          <h3>📍 Office</h3>
          <p>WebsiteName Environmental Community</p>
          <p>New Delhi, India</p>
        </div>

        {/* Working Hours */}
        <div style={{ width: "33%", minWidth: "250px" }}>
          <h3>🕒 Working Hours</h3>
          <p>Monday – Friday: 9:00 AM – 6:00 PM</p>
          <p>Saturday: 10:00 AM – 2:00 PM</p>
        </div>
      </div>
      </div>
      
    </>
  );
}

export default App;
