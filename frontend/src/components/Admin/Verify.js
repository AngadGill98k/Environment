import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const Verify = () => {
    let location=useLocation()
    let {paper}=location.state || {}
    let token = useSelector((state) => state.token);
    useEffect(() => {
        console.log(paper);
        fetch('http://localhost:3001/read_paper', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(paper)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
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
  return (
    <>
    <button onClick={handlebookmark}>bookmark</button>
    </>
  )
}

export default Verify