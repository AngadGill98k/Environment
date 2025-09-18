import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  let token=useSelector((state) => state.token);
  let naviagte=useNavigate()


  let [toggle,settoggle]=useState("verify")
  let [paper,setpaper]=useState([]);
  let [bookmarks,setbookmark]=useState([]);
  useEffect(() => {
    console.log(token);
    fetch('http://localhost:3001/get_papers_to_verify', {
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
        setpaper(data.papers)
      }
    })
    .catch(err => console.error(err));


    fetch('http://localhost:3001/get_bookmarks', {
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
        setbookmark(data.bookmarks)
      }
    })
    .catch(err => console.error(err));


    fetch('http://localhost:3001/get_moderators', {
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
    })
    .catch(err => console.error(err));
  }, [])
  

  let nameref=useRef()
  let passref=useRef()
  let mailref=useRef()
  let handleMod=()=>{
    fetch('http://localhost:3001/add_moderator', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name:nameref.current.value,
        pass:passref.current.value,
        mail:mailref.current.value
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
    })
    .catch(err => console.error(err));
  }
  return (
    <>
    <div className="nav_con"><Navbar/></div>
    
    <div>
  <button onClick={() => settoggle("verify")}>Verify Papers</button>
  <button onClick={() => settoggle("moderators")}>Manage Moderators</button>
  <button onClick={() => settoggle("bookmark")}>Manage Bookmarks</button>
</div>

{/* Verify Papers Section */}
{toggle === "verify" && (
  <ul>
    {paper &&
      paper.map((p, index) => (
        <li
          key={index}
          onClick={() => {console.log(p);
            naviagte(`/verify`, { state: { paper: p } });
          }}
        >
          <h3>{p.title}</h3>
          <p>{p.description}</p>
          <span>{p.verified ? "✅ Verified" : "❌ Not Verified"}</span>
        </li>
      ))}
  </ul>
)}

{/* Moderators Section */}
{toggle === "moderators" && (
  <>
    <input ref={nameref} type="text" placeholder="username" />
    <input ref={mailref} type="text" placeholder="email" />
    <input ref={passref} type="text" placeholder="password" />
    <button onClick={handleMod}>Add mod</button>
  </>
)}

{/* Bookmarks Section */}
{toggle === "bookmark" && (
  <ul>
    {bookmarks &&
      bookmarks.map((bookmark, index) => (
        <li  onClick={() => {
            naviagte(`/verify`, { state: { bookmark: bookmark } });
          }} key={index}>
          <h3>{bookmark.title}</h3>
          <p>{bookmark.description}</p>
          <span>{bookmark.verified ? "✅ Verified" : "❌ Not Verified"}</span>
        </li>
      ))}
  </ul>
)}

    


    
    </>
  )
}

export default Admin