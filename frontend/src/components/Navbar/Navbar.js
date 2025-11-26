import React, { use, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import './nav.css'
import { useSelector } from 'react-redux'
const Navbar = ({}) => {
    let navigate=useNavigate()
    let [admin,setadmin]=React.useState(false)
    let token =useSelector((state)=>state.token);
    useEffect(()=>{
      fetch('http://localhost:3001/get_user',{
        method:'GET',
        credentials:'include',
        headers:{
          'Content-Type':'application/json',
          'Authorization':`Bearer ${token}`
        }
      }).then(res=>res.json())
      .then(data=>{
        console.log(data);
        if(data.msg==true){
          setadmin(false)
        }else setadmin(true)    
      })
      .catch(err=>console.error(err));
    },[])
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
    {admin&&(
      <button
    onClick={() => {
      navigate("/admin",{state:{token}});
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

    )}
  
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