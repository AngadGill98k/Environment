import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const Verify = () => {
    let location=useLocation()
    let {paper}=location.state || {}
    let token = useSelector((state) => state.token);
   

    console.log(paper);
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
          requestid:paper._id,paperid:paper.research_paper
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

    </>
  )
}

export default Verify