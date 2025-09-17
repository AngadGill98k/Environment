import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Air_content from './Air_content'
import Water_content from './Water_content'
import Soil_content from './Soil_content'
import Env_content from './Env_content'
import "./Content.css"
const Content = () => {
  let topics = [
    { topic: "Environmental Pollution", content: <Env_content /> },
    {
      topic: "Types", subs: [
        { sub_topic: "Air Pollution", content: <Air_content /> },
        { sub_topic: "Water Pollution", content: <Water_content /> },
        { sub_topic: "Soil Pollution", content: <Soil_content /> }
      ]
    },
    { topic: "Case Studies", subs: [] }
  ]

  let [topic, setTopic] = useState(topics[0])
  let [sub_topic, setSubTopic] = useState()



  return (
    <>
      <div className='nav_con'>
        <Navbar />
      </div>


      <div className='content_con'>

        <div className='content_list'>
            <h3 style={{padding:"0px",margin:"20px 0 0 10px"}}>Table of content</h3>   
            <ul style={{listStyle:"none",padding:"20px",margin:"0px",display:"flex",flexDirection:"column",gap:"8px"}}>
              {topics.map((item, index) => (
                <li key={index}>
                  <div onClick={() => {setTopic(item);setSubTopic(item.subs && item.subs[0])}}>{item.topic}</div>
                  {item.topic === topic.topic && item.subs && item.subs.length > 0 && (
                    <ul>
                      {item.subs.map((sub, idx) => (
                        <li key={idx} onClick={() => setSubTopic(sub)}>
                          {sub.sub_topic}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
        </div>


        <div className="right">
            {sub_topic ? sub_topic.content : topic.content}
        </div>
        
      </div>
    </>
  )
}

export default Content
