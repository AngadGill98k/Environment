import React from 'react'
import { useNavigate } from 'react-router-dom'
import './nav.css'
const Navbar = () => {
    let navigate=useNavigate()
    return (
        <>
            <div style={{height:"100%",width:"20%"}} onClick={()=>{navigate("/home")}}>
                <img style={{height:"100%",width:"100%",objectFit:"cover"}} src='/Gemini_Generated_Image_hpg0brhpg0brhpg0-removebg-preview.png' alt='logo' className='logoimg' />
                
            </div>


            <div className='NavOptions'>
                <button
    onClick={() => {
      navigate("/forums");
    }}
    style={{
      padding: "10px 20px",
      fontSize: "16px",
      borderRadius: "8px",
      border: "1px solid #999",
      cursor: "pointer",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = "scale(1.05)";
      e.currentTarget.style.boxShadow = "0 3px 8px rgba(0,0,0,0.1)";
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = "scale(1)";
      e.currentTarget.style.boxShadow = "none";
    }}
  >
    Forums
  </button>

  <button
    onClick={() => {
      navigate("/admin");
    }}
    style={{
      padding: "10px 20px",
      fontSize: "16px",
      borderRadius: "8px",
      border: "1px solid #999",
      cursor: "pointer",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = "scale(1.05)";
      e.currentTarget.style.boxShadow = "0 3px 8px rgba(0,0,0,0.1)";
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = "scale(1)";
      e.currentTarget.style.boxShadow = "none";
    }}
  >
    Admin
  </button>

  <button
    onClick={() => {
      navigate("/user");
    }}
    style={{
      padding: "10px 20px",
      fontSize: "16px",
      borderRadius: "8px",
      border: "1px solid #999",
      cursor: "pointer",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = "scale(1.05)";
      e.currentTarget.style.boxShadow = "0 3px 8px rgba(0,0,0,0.1)";
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = "scale(1)";
      e.currentTarget.style.boxShadow = "none";
    }}
  >
    User
  </button>
                {/* <button onClick={()=>{navigate("/")}}>Login</button> */}
            </div>
        </>
    )
}

export default Navbar