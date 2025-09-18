import React, { useReducer, useRef } from 'react'
import { useSelector } from 'react-redux';

const Replies = ({ paper }) => {
    let replyref = useRef()
    let token = useSelector((state) => state.token);
    const [_, forceRender] = useReducer((x) => x + 1, 0);
    let handlereply = () => {
        console.log(replyref.current.value);
        fetch('http://localhost:3001/comment_forum', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            reply:replyref.current.value,
            forumid:paper._id
          })
        })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if(data.msg){
            paper.replies.push(data.comment)
            replyref.current.value = ''
            forceRender()
          }
        })
        .catch(err => console.error(err));
    }
    return (
        <>
            <div>
                <input ref={replyref} type="text" placeholder='reply' />
                <button onClick={() => { handlereply()}}>reply</button>
            </div>


            <ul>
                {paper.replies.length > 0 && paper.replies.map((reply,index) => {
                    return(
                        <>
                        <li key={index}>
                            <span>{reply.name}</span>
                            <span>{reply.reply}</span>
                        </li>
                        </>
                    )
                })}
            </ul>
        </>
    )
}

export default Replies