import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const Verify = () => {
    let location=useLocation()
    let {paper}=location.state || {}
    let [Paper,setpaper]=useState()
    let token = useSelector((state) => state.token);
    useEffect(() => {
      console.log(paper);
        fetch('http://localhost:3001/paper_filler', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            paper
          })
        })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if(data.msg){
            setpaper(data.paper)
          }
        })
        .catch(err => console.error(err));
    }, [])
    

    
    let handlebookmark=()=>{
        fetch('http://localhost:3001/bookmark_paper', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({paperid:paper._id})
        })
        .then(res => res.json())
        .then(data => {
          console.log(data);
        })
        .catch(err => console.error(err));
    }


    let handleverify=()=>{
      fetch('http://localhost:3001/verify_paper', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          requestid:Paper._id,paperid:Paper.paperid
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
    <button onClick={handlebookmark}>bookmark</button>
  

    <button onClick={handleverify}>Verify</button>


    {Paper && <iframe src={`http://localhost:3001/${Paper.research_paper.file.path}`} width="100%" height="600px" title="PDF Viewer"></iframe>}
    </>
  )
}

export default Verify