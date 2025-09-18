import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  let token=useSelector((state) => state.token);
  let naviagte=useNavigate()


  let [toggle,settoggle]=useState(false)
  let [paper,setpaper]=useState([]);
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
        <button onClick={()=>{settoggle(false)}}>Verify Papers</button>
        <button onClick={()=>{settoggle(true)}}>Manage Moderaters</button>
    </div>

    {toggle ? <><input ref={nameref} type="text" placeholder='username' />
    <input ref={mailref} type="text" placeholder='email' />
    <input ref={passref} type="text" placeholder='password' />
    <button onClick={handleMod}>Add mod</button>
    </> :<ul>
      {paper && paper.map((paper,index)=>{
        return(
          <li onClick={()=>{naviagte(`/verify`,{ state: { paper } })}} key={index}>
              <h3>{paper.title}</h3>
              <p>{paper.description}</p>
              <span>{paper.verified}</span>

          </li>
        )
      })}
    </ul> 
    }
    


    
    </>
  )
}

export default Admin