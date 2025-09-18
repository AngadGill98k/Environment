import React, { useRef } from 'react'

const Replies = ({ paper }) => {
    let replyref = useRef()
    return (
        <>
            <div>
                <input type="text" placeholder='reply' />
                <button onClick={() => { }}>reply</button>
            </div>


            <ul>
                {paper.replies > 0 && paper.replies.map((reply,index) => {
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