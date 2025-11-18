import React, { useReducer, useRef } from 'react';
import { useSelector } from 'react-redux';

const Replies = ({ paper }) => {
  const replyref = useRef();
  const token = useSelector((state) => state.token);
  const [_, forceRender] = useReducer((x) => x + 1, 0);

  const handlereply = () => {
    fetch('http://localhost:3001/comment_forum', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        reply: replyref.current.value,
        forumid: paper._id
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.msg) {
          paper.replies.push(data.comment);
          replyref.current.value = '';
          forceRender();
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <div style={{
      backgroundColor: '#fff8e6',
      marginTop: '15px',
      padding: '10px 15px',
      borderRadius: '8px',
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '10px'
      }}>
        <input
          ref={replyref}
          type="text"
          placeholder="Write a reply..."
          style={{
            flex: 1,
            padding: '8px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            fontSize: '14px'
          }}
        />
        <button
          onClick={handlereply}
          style={{
            padding: '8px 12px',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: '#F5F6BF',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Reply
        </button>
      </div>

      <ul style={{ padding: '0', margin: '0', listStyle: 'none' }}>
        {paper.replies.length > 0 && paper.replies.map((reply, index) => (
          <li key={index} style={{
            backgroundColor: '#fff',
            borderRadius: '6px',
            padding: '8px 10px',
            marginBottom: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <span style={{ fontWeight: 'bold' }}>{reply.name}</span>
            <p style={{ margin: '5px 0 0 0' }}>{reply.reply}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Replies;
