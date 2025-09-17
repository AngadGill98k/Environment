import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import "./forums.css"
const Forums = () => {
  useEffect(() => {



  }, [])



  let searchRef = useRef()
  let handleSearch = () => {
    console.log("value being searched ", searchRef.current.value)
    fetch('http://localhost:3001/search_for_forum_id?forumid=' + searchRef.current.value, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.msg) {

        }
      })
      .catch(err => console.error(err));
  }


  let [papers, setpapers] = useState([]);
  return (
    <>
      <div className='nav_con'>
        <Navbar />
      </div>



      <h1>Forums</h1>
      <div className='search'>
        <div style={{ borderRadius: "76px", backgroundColor: "green", display: "flex", flexDirection: "row", padding: "0 19px 0 19px", justifyContent: "center", alignItems: "center", boxSizing: "border-box" }}>
          <input style={{ borderRadius: "76px", border: "none", background: "none" }} ref={searchRef} type="text" placeholder='Enter refrence id' onKeyDown={handleSearch} />
          <button style={{ borderRadius: "76px", border: "none", background: "none" }} onClick={handleSearch}>Search</button>
        </div>
      </div>


      <div className='papers'>
        <ul>
          {papers && papers.map((paper, index) => {
            return (
              <li key={index}>
                <span>{paper.title} paper Titile</span>
                <span>{paper.description} paper Description</span>

                <span>{paper.refrence_links}refrence_links</span>

                <span>{paper.verified}verified??</span>
                <span>{paper.verified_by}verified_by</span>

                <span>{paper.organization}organization</span>

                <span>{paper.user}click user to see all teh papers</span>
              </li>
            )
          })}
        </ul>
      </div>
    </>

  )
}

export default Forums