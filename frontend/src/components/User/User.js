import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { useSelector } from 'react-redux'
const User = () => {
  let nameref=useRef()
  let descriptionref=useRef()
  let fileref=useRef()
  let token = useSelector((state) => state.token);
  let handlepaper=()=>{
    console.log(nameref.current.value,descriptionref.current.value)
    let formdata=new FormData()
    formdata.append('file',fileref.current.files[0])
    formdata.append('name',nameref.current.value)
    formdata.append('description',descriptionref.current.value)
    fetch('http://localhost:3001/add_paper', {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Authorization": `Bearer ${token}`
      },
      body: formdata
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
    })
    .catch(err => console.error(err));
  }

  let [user,setuser]=useState()
  useEffect(() => {
    fetch('http://localhost:3001/get_user', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if(data.msg){
        setuser(data.user)
        
      }
    })
    .catch(err => console.error(err));
  }, [])
  

  
  let handlePaper=(paper)=>{
    
  }
  return (
  <>
    <div className="nav_con">
      <Navbar />
    </div>

    {user && (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          margin: "20px",
          fontSize: "18px",
          lineHeight: "1.6",
        }}
      >
        <span><strong>Name:</strong> {user.name}</span>
        <span><strong>Email:</strong> {user.mail}</span>
        <span><strong>Organization:</strong> any org?</span>
      </div>
    )}

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        margin: "20px",
        width: "50%",
      }}
    >
      <input
        type="text"
        placeholder="Paper name"
        ref={nameref}
        style={{
          padding: "10px",
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "6px",
        }}
      />
      <textarea
        placeholder="Paper description"
        ref={descriptionref}
        style={{
          padding: "10px",
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "6px",
          minHeight: "100px",
        }}
      />
      <input
        type="file"
        ref={fileref}
        style={{
          fontSize: "15px",
        }}
      />
      <button
        onClick={() => {
          handlepaper();
        }}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "6px",
          border: "1px solid #999",
          cursor: "pointer",
          width: "fit-content",
        }}
      >
        Submit
      </button>
    </div>

    <h3 style={{ margin: "20px", fontSize: "22px",boxSizing:"border-box" }}>All Papers</h3>

    <div style={{ margin: "20px", width: "70%",boxSizing:"border-box"  }}>
      <ul style={{ margin: 0, padding: 0 }}>
        {user &&
          user.research_paper.map((paper, index) => (
            <li
              key={index}
              style={{
                listStyle: "none",
                border: "2px solid #ddd",
                borderRadius: "10px",
                padding: "15px",
                marginBottom: "12px",
                backgroundColor: "#fff",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.02)";
                e.currentTarget.style.boxShadow =
                  "0 4px 10px rgba(0, 0, 0, 0.15)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 2px 6px rgba(0, 0, 0, 0.1)";
              }}
              onClick={() => {
                handlePaper(paper);
              }}
            >
              <p style={{ margin: "0", fontWeight: "bold" }}>{paper.title}</p>
              <p style={{ margin: "5px 0" }}>{paper.description}</p>
              <p style={{ margin: "5px 0" }}>
                {paper.verified ? "✅ Verified" : "❌ Not Verified"}
              </p>
              {paper.verified && (
                <p style={{ margin: "5px 0" }}>
                  Verified by <strong>{paper.verified_by}</strong>
                </p>
              )}
            </li>
          ))}
      </ul>
    </div>
  </>
);

}

export default User