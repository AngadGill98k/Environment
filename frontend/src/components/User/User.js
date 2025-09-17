import React from 'react'
import Navbar from '../Navbar/Navbar'
const User = () => {
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