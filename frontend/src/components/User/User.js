import React, { useEffect, useRef } from 'react'
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
    })
    .catch(err => console.error(err));
  }, [])
  
  return (
    <>
    <div className='nav_con'>
        <Navbar/>
    </div>


    <div>
        <span>user name</span>
        <span>is verified?</span>
        <span>any org?</span>
    </div>


    <input type="text" placeholder='Paper name' ref={nameref}/>
    <textarea placeholder='Paper description' ref={descriptionref}/>
    <input type='file' ref={fileref}/>
    <button onClick={()=>{handlepaper()}}>Submit</button>

    

    <h3>All papers</h3>
    <div>
        <ul>
            {}
        </ul>
    </div>
    </>
  )
}

export default User