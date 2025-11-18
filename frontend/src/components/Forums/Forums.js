import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './forums.css';
import { useSelector } from 'react-redux';
import Replies from './Replies';

const Forums = () => {
  const token = useSelector((state) => state.token);
  const [papers, setpapers] = useState([]);
  const [showreply, setreply] = useState('');
  const searchRef = useRef();

  useEffect(() => {
    fetch('http://localhost:3001/get_forums', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.msg) setpapers(data.forums);
      })
      .catch(err => console.error(err));
  }, []);

  const handleSearch = () => {
    fetch('http://localhost:3001/search_for_forum_id?forumid=' + searchRef.current.value, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error(err));
  };

  return (
    <>
      <div className="nav_con">
        <Navbar />
      </div>

      <h1 style={{
        textAlign: 'center',
        color: '#333',
        marginTop: '20px',
        fontFamily: 'Gill Sans, Calibri, sans-serif'
      }}>Forums</h1>

      <div className="search" style={{
        display: 'flex',
        justifyContent: 'center',
        margin: '20px 0'
      }}>
        <div style={{
          borderRadius: '50px',
          backgroundColor: '#F5F6BF',
          display: 'flex',
          padding: '8px 20px',
          alignItems: 'center',
          width: '40%',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
        }}>
          <input
            ref={searchRef}
            type="text"
            placeholder="Enter reference ID"
            style={{
              border: 'none',
              background: 'transparent',
              outline: 'none',
              flex: 1,
              fontSize: '16px',
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >🔍</button>
        </div>
      </div>

      <div className="papers" style={{
        backgroundColor: 'antiquewhite',
        padding: '20px',
        borderRadius: '10px',
        margin: '0 auto 40px auto',
        width: '80%',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
          {papers && papers.map((paper, index) => (
            <li key={index} style={{
              backgroundColor: '#fff',
              borderRadius: '10px',
              padding: '15px',
              marginBottom: '15px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.01)';
                e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
              }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '10px'
              }}>
                <div style={{ flex: 1 }}>
                  <span style={{ fontWeight: 'bold', display: 'block' }}>{paper.title}</span>
                  <span style={{ display: 'block', marginBottom: '5px' }}>{paper.description}</span>
                  <span style={{ color: '#666' }}>🔗 {paper.refrence_links}</span>
                  <span style={{ color: '#666' }}>🏢 {paper.organization}</span>
                  <span style={{ color: '#666' }}>👤 {paper.user}</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ display: 'block' }}>{paper.verified ? '✅ Verified' : '❌ Not Verified'}</span>
                  <span style={{ display: 'block', color: '#666' }}>By: {paper.verified_by}</span>
                </div>
              </div>
              <button
                onClick={() => { setreply(paper); }}
                style={{
                  marginTop: '10px',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  cursor: 'pointer',
                  backgroundColor: '#F5F6BF',
                  fontWeight: 'bold'
                }}
              >
                View Replies
              </button>

              {showreply && showreply._id === paper._id && (
                <Replies paper={paper} />
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Forums;
